import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Guild } from '../models/guildbank/guild';
import { map } from 'rxjs/operators';
import { AddGuildModel } from '../models/guild/addGuildModel';
import { RenameGuildModel } from '../models/guild/renameGuildModel';
import { GuildMember } from '../models/guild/guild-member.model';
import { Character } from '../models/guildbank/character';
import { GuildMembership } from '../models/guild/guild-membership.model';
import { Bag } from '../models/guildbank/bag';
import { BagSlot } from '../models/guildbank/bagslot';
import { Item } from '../models/guildbank/item';

import * as configuration from '../../config/appconfig.json';
import { RequestItemsModel } from '../models/guild/requestItemsModel';
import { LANGUAGE_PREFERENCE } from './constants';
import { ItemRequest } from '../models/guildbank/ItemRequest';
import { Transaction } from '../models/guild/transaction';

@Injectable({
  providedIn: 'root'
})
export class GuildService {
             
    private serviceUri: string;
    
    constructor(private http: HttpClient) { 
		this.serviceUri = `${configuration.api}/guild`;
	}

	// public getGuild(id: string): Observable<Guild> {
	// 	return this.http.get(`${this.serviceUri}/GetGuild/${id}`)
	// 		.pipe(
	// 			map( (response: any) => { 
	// 				return new Guild(response)
	// 			})
	// 		)
    // }
    
    public getGuilds() {
        return this.http.get(`${this.serviceUri}/GetGuilds`)
            .pipe(
                map( (response: any[]) => {
                    return response.map( item => new Guild(item))
                }) 
            );
    }

    public addGuild(addGuildModel: AddGuildModel) {
        return this.http.post(this.serviceUri, addGuildModel)
			.pipe(
				map( (response: any) => { 
					return new Guild(response)
				})
			)
    }

    public renameGuild(renameGuildModel: RenameGuildModel) {
        return this.http.post(this.serviceUri+`/RenameGuild`, renameGuildModel );
    }

    public approveItemRequest(itemRequestId: string, guildId: string) {
        return this.http.post(`${this.serviceUri}/ApproveItemRequest/${guildId}/${itemRequestId}`, {} );
    }

    public denyItemRequest(itemRequestId: string, guildId: string) {
        return this.http.post(`${this.serviceUri}/DenyItemRequest/${guildId}/${itemRequestId}`, {} );
    }

    public deleteGuild(guildId: string) {
        return this.http.delete(`${this.serviceUri}/${guildId}` );
    }

    public removeMemberFromGuild(userId: string, guildId: string) {
        return this.http.post(`${this.serviceUri}/RemoveMemberFromGuild/${guildId}/${userId}`, {} );
    }  

    public removeSelfFromGuild(guildId: string) {
        return this.http.post(`${this.serviceUri}/RemoveSelfFromGuild/${guildId}`, {} );
    }

    public toggleUploadAccess(userId: string, guildId: string) {
        return this.http.post(`${this.serviceUri}/ToggleUploadAccess/${guildId}/${userId}`, {} );
    } 

    public updateLastSelectedGuild(guildId: string) {
        return this.http.post(`${this.serviceUri}/UpdateLastSelectedGuild/${guildId}`, {} );
    }

    public updateGuildInviteLink(guildId: string): Observable<Guild> {
        return this.http.patch(`${this.serviceUri}/UpdateInviteLink/${guildId}`, {}).pipe(map((response: any) => new Guild(response)));
    }

    public updateGuildPublicLink(guildId: string, enabled: boolean): Observable<Guild> {
        return this.http.patch(`${this.serviceUri}/UpdatePublicLink/${guildId}/${enabled}`, {}).pipe(map((response: any) => new Guild(response)));
    }

    public getGuildFromToken(token: string): Observable<Guild> {
        return this.http.get(`${this.serviceUri}/GetFromToken/${token}`).pipe(map((response: any) => new Guild(response)));
    }

    public getGuildFromReadonlyToken(token: string): Observable<Guild> {
        return this.http.get(`${this.serviceUri}/GetFromReadonlyToken/${token}`).pipe(
            map((response: any) => {
                const guild = new Guild(response);
                guild.characters = this.createCharacters(response.characters as any[]); 

                return guild;
            }));
    }

    public joinGuild(guildId: string): Observable<Guild> {
        return this.http.patch(`${this.serviceUri}/JoinGuild/${guildId}`, {}).pipe(map((response: any) => new Guild(response)));
    }

    public getGuildMembers(guildId: string ): Observable<GuildMember[]> {
        return this.http.get(`${this.serviceUri}/GuildMembers/${guildId}`).pipe(
            map((response: any[]) => response.map( item => new GuildMember(item)))
        );
    }

    public getGuildMembership(): Observable<GuildMembership[]> {
        return this.http.get(`${this.serviceUri}/GuildMembership`).pipe(
            map((response: any[]) => response.map( item => new GuildMembership(item)))
        );
    }

    public updateGuildMembership(membership: GuildMembership): Observable<GuildMembership> {
        return this.http.post(`${this.serviceUri}/GuildMembership`, membership).pipe(
            map((response: any) => new GuildMembership(response))
        );
    }

    public getCharacters(guildId: string): Observable<Character[]> {
       return this.http.get(`${this.serviceUri}/GetCharacters/${guildId}`).pipe(
           map((response: any[]) => this.createCharacters(response))
       );
    }

    public uploadImportString(guildId: string, importString: string) {
        return this.http.post(this.serviceUri + `/UploadImportString/${guildId}`, { EncodedImportString: importString });
    } 

    public deleteCharacterFromGuild(guildId: string, characterId: string) {
        return this.http.delete(`${this.serviceUri}/DeleteCharacterFromGuild/${guildId}/${characterId}` );
    }

    public getPageOfTransactions(guildId: string, page: number, pageSize: number) {
        return this.http.get(`${this.serviceUri}/GetTransactions/${guildId}?page=${page}&pageSize=${pageSize}`)
            .pipe(map((response: any[]) => {
                return response.map( transaction => new Transaction(transaction));
        }));
    }

    public getTransactionCount(guildId: string) {
        return this.http.get(`${this.serviceUri}/GetTransactionCount/${guildId}`);
    }

    public requestItems(requestItemsModel: RequestItemsModel) {
        return this.http.post(this.serviceUri+`/RequestItems`, requestItemsModel );
    }
    
    public getItemRequests(guildId: string) {
        return this.http.get(`${this.serviceUri}/GetItemRequests/${guildId}`)
        .pipe(
            map( (response: any[]) => {
                return response.map( item => new ItemRequest(item));
            })
        );
    }

    public getMyItemRequests(guildId: string) {
        return this.http.get(`${this.serviceUri}/GetMyItemRequests/${guildId}`)
        .pipe(
            map( (response: any[]) => {
                return response.map( item => new ItemRequest(item));
            })
        );
    }

    private createCharacters(items: any[]): Character[] {
        const characters: Character[] = [];
        let lang = localStorage.getItem(LANGUAGE_PREFERENCE);
        let nameField = "name";
        if(lang && lang != "en") {
            nameField = `${lang}Name`;
        }
        
        items.forEach( el => {
            const char = new Character(el);

            if (el.bags) {
                const bags = [];
                el.bags.forEach( b => {
                    const bag = new Bag(b);

                    if( b.bagSlots ) {
                        const slots = [];
                        b.bagSlots.forEach( s => {
                            const slot = new BagSlot(s)

                            if(s.item) {
                                const item = new Item(s.item);
                                item.name = s.item[nameField];
                                slot.item = item;
                            }

                            slots.push(slot);                                
                        })
                        bag.bagSlots = slots;
                    }

                    bags.push(bag);
                })
                char.bags = bags;
            }

            characters.push(char);
        });

        return characters.sort( (a: Character, b: Character) => {
            if(!a.lastUpdated) {
                if(b.lastUpdated) {
                    return -1;
                }

                return 0;
            }

            if(!b.lastUpdated) {
                return 1;
            }

            return a.lastUpdated.getTime() - b.lastUpdated.getTime();
        })
    }
}
