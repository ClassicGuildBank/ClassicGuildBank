import { Injectable } from '@angular/core';
import { Character } from '../models/guildbank/character';
import { BehaviorSubject, Observable } from 'rxjs';
import { Guild } from '../models/guildbank/guild';
import { GuildService } from './guild.service';
import { map, tap } from 'rxjs/operators';
import { AddGuildModel } from '../models/guild/addGuildModel';
import { RenameGuildModel } from '../models/guild/renameGuildModel';
import { GuildMembership } from '../models/guild/guild-membership.model';
import { GuildMember } from '../models/guild/guild-member.model';
import { IMoney } from '../models/guildbank/money.interface';
import { RequestItemsModel } from '../models/guild/requestItemsModel';
import { RequestItemModel } from '../models/guild/requestItemModel';
import { ItemRequest } from '../models/guildbank/ItemRequest';
import { Transaction } from '../models/guild/transaction';

@Injectable({
    providedIn: 'root'
})
export class GuildStore {

    private _charactersLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public charactersLoading$: Observable<boolean> = this._charactersLoading.asObservable();

    private _guildList: BehaviorSubject<Guild[]> = new BehaviorSubject([]);
    public guildList$: Observable<Guild[]> = this._guildList.asObservable();

    private _guild: BehaviorSubject<Guild> = new BehaviorSubject(null);
    public guild$: Observable<Guild> = this._guild.asObservable();

    private _guildsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public guildsLoading$: Observable<boolean> = this._guildsLoading.asObservable();

    private _guildMembers: BehaviorSubject<GuildMember[]> = new BehaviorSubject(null);
    public guildMembers$: Observable<GuildMember[]> = this._guildMembers.asObservable();

    private _guildMembership: BehaviorSubject<GuildMembership[]> = new BehaviorSubject(null);
    public guildMembership$: Observable<GuildMembership[]> = this._guildMembership.asObservable();

    private _characters: BehaviorSubject<Character[]> = new BehaviorSubject([]);
    public characters$: Observable<Character[]> = this._characters.asObservable();

    private _guildReadonly: BehaviorSubject<Guild> = new BehaviorSubject(null);
    public guildReadonly$: Observable<Guild> = this._guildReadonly.asObservable();

    private _guildReadonlyLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public guildReadonlyLoading$: Observable<boolean> = this._guildReadonlyLoading.asObservable();

    private _itemRequestsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public itemRequestsLoading$: Observable<boolean> = this._itemRequestsLoading.asObservable();

    private _myItemRequestsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public myItemRequestsLoading$: Observable<boolean> = this._myItemRequestsLoading.asObservable();

    private _transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject([]);
    public transactions$: Observable<Transaction[]> = this._transactions.asObservable();

    private _transactionCount: BehaviorSubject<number> = new BehaviorSubject(null);
    public transactionCount$: Observable<number> = this._transactionCount.asObservable();

    private _transactionPage: BehaviorSubject<number> = new BehaviorSubject(1);
    public transactionPage$: Observable<number> = this._transactionPage.asObservable();

    public guildMoney$: Observable<IMoney> = this.characters$.pipe(
        map(chars => chars.map(c => c.gold).reduce((sum, curr) => sum + curr, 0)),
        map(goldTotal => {
            return {
                gold: goldTotal,
                get goldAmt() { return Math.floor(this.gold / 10000) },
                get silverAmt() { return Math.floor((this.gold / 100) % 100); },
                get copperAmt() { return this.gold % 100; }
            } as IMoney;
        }));

    private _itemRequests: BehaviorSubject<ItemRequest[]> = new BehaviorSubject([]);
    public itemRequests$: Observable<ItemRequest[]> = this._itemRequests.asObservable();

    private _myItemRequests: BehaviorSubject<ItemRequest[]> = new BehaviorSubject([]);
    public myItemRequests$: Observable<ItemRequest[]> = this._myItemRequests.asObservable();

    constructor(
        private _guildService: GuildService
    ) {
    }

    public updateSelectedGuild(guildId: string) {
        var guilds = this._guildList.value;

        var selectedGuildIndex = guilds.findIndex(guild => guild.id === guildId);

        this._guild.next(guilds[selectedGuildIndex]);
        this._guildService.updateLastSelectedGuild(guildId).subscribe();

        this.updateCharacters(this._guild.value);
    }

    public getGuilds() {
        this._guildsLoading.next(true);

        return this._guildService.getGuilds().pipe(tap({
            next: guilds => {
                this._guildList.next(guilds)

                var selectedGuildIndex = guilds.findIndex(guild => guild.isSelected);

                if (selectedGuildIndex === -1)
                    selectedGuildIndex = 0;

                if (guilds.length === 0)
                    this._guild.next(null);
                else
                    this._guild.next(guilds[selectedGuildIndex]);

                this.updateCharacters(this._guild.value);
            },
            complete: () => {
                this._guildsLoading.next(false);
            }
        }));
    }

    public getGuildMembers(guildId: string) {
        return this._guildService.getGuildMembers(guildId).pipe(tap({
            next: members => this._guildMembers.next(members)
        }))
    }

    public getGuildMembership() {
        return this._guildService.getGuildMembership().pipe(tap({
            next: membership => this._guildMembership.next(membership)
        }));
    }

    public getCurrentGuildMembership() {
        var guildMemberships = this._guildMembership.value;

        var currentguildMembershipIndex = guildMemberships.findIndex(guildMembership => guildMembership.guildId === this._guild.value.id);

        return guildMemberships[currentguildMembershipIndex];
    }

    public updateGuildMembership(membership: GuildMembership) {
        return this._guildService.updateGuildMembership(membership);
    }

    public addGuild(addGuildModel: AddGuildModel) {
        return this._guildService.addGuild(addGuildModel).pipe(tap({
            next: guild => {
                var guilds = this._guildList.value;

                guilds.push(guild);

                this._guildList.next(guilds);

                this.updateSelectedGuild(guild.id);
            }
        }));
    }

    public renameCurrentGuild(guildNameForRename: string) {
        var renameGuildModel = new RenameGuildModel({
            guildName: guildNameForRename,
            guildId: this._guild.value.id
        });

        return this._guildService.renameGuild(renameGuildModel).pipe(tap({
            next: () => {
                var guilds = this._guildList.value;

                var renamedGuildIndex = guilds.findIndex(guild => guild.id === this._guild.value.id);

                guilds[renamedGuildIndex].name = renameGuildModel.guildName;

                this._guildList.next(guilds);

                this.updateSelectedGuild(guilds[renamedGuildIndex].id);
            }
        }));
    }

    public requestItems(characterName: string, gold: number, requestItemModels: RequestItemModel[]) {
        var requestItemsModel = new RequestItemsModel({
            characterName: characterName,
            guildId: this._guild.value.id,
            gold: gold,
            requestItemModels: requestItemModels
        });

        return this._guildService.requestItems(requestItemsModel).pipe(tap({
            next: () => {
                //Add to my requests?

                //Signal R to add to open requests for guild owner without needing a page refresh?
            }
        }));
    }

    public clearGuilds() {
        this._guildList.next([]);
        this._guild.next(null);
    }

    public deleteCurrentGuild() {
        return this._guildService.deleteGuild(this._guild.value.id).pipe(tap({
            next: () => {
                var guilds = this._guildList.value;

                var deletedGuildIndex = guilds.findIndex(guild => guild.id === this._guild.value.id);

                guilds.splice(deletedGuildIndex, 1);

                this._guildList.next(guilds);

                if (guilds.length == 0)
                    this._guild.next(null);

                else
                    this.updateSelectedGuild(guilds[0].id);
            }
        }));
    }

    public removeMemberFromGuild(userId: string) {
        return this._guildService.removeMemberFromGuild(userId, this._guild.value.id).pipe(tap({
            next: () => {
                var guildMembers = this._guildMembers.value;

                var removedGuildMemberIndex = guildMembers.findIndex(guildMember => guildMember.userId === userId);

                guildMembers.splice(removedGuildMemberIndex, 1);

                this._guildMembers.next(guildMembers);
            }
        }));
    }

    public toggleUploadAccess(userId: string) {
        return this._guildService.toggleUploadAccess(userId, this._guild.value.id).pipe(tap({
            next: () => {
                var guildMembers = this._guildMembers.value;

                var toggledGuildMemberIndex = guildMembers.findIndex(guildMember => guildMember.userId === userId);

                guildMembers[toggledGuildMemberIndex].canUpload = !guildMembers[toggledGuildMemberIndex].canUpload;

                this._guildMembers.next(guildMembers);
            }
        }));
    }

    public removeSelfFromGuild(guildId: string) {
        return this._guildService.removeSelfFromGuild(guildId).pipe(tap({
            next: () => {
                var guildMembership = this._guildMembership.value;

                var removedguildMembershipIndex = guildMembership.findIndex(membership => membership.guildId === guildId);

                guildMembership.splice(removedguildMembershipIndex, 1);

                this._guildMembership.next(guildMembership);

                var guilds = this._guildList.value;

                var removedGuildIndex = guilds.findIndex(guild => guild.id === guildId);

                guilds.splice(removedGuildIndex, 1);

                this._guildList.next(guilds);

                if (this._guild.value.id !== guildId)
                    return;

                if (guilds.length == 0)
                    this._guild.next(null);

                else
                    this.updateSelectedGuild(guilds[0].id);
            }
        }));
    }

    public updateGuildInviteLink() {
        return this._guildService.updateGuildInviteLink(this._guild.value.id).pipe(
            tap({
                next: guild => {
                    var guilds = this._guildList.value;
                    var index = guilds.findIndex(g => g.id === this._guild.value.id);
                    guilds[index].inviteUrl = guild.inviteUrl;

                    this.updateSelectedGuild(guilds[index].id);
                }
            })
        )
    }

    public updateGuildPublicLink(enabled: boolean) {
        return this._guildService.updateGuildPublicLink(this._guild.value.id, enabled).pipe(
            tap({
                next: guild => {
                    var guilds = this._guildList.value;
                    var index = guilds.findIndex(g => g.id === this._guild.value.id);

                    guilds[index].publicUrl = guild.publicUrl;
                    guilds[index].publicLinkEnabled = enabled;

                    this.updateSelectedGuild(guilds[index].id);
                }
            })
        )
    }

    public updateCharacters(guild?: Guild) {
        if (!guild)
            guild = this._guild.value;

        if (guild === null) {
            this._characters.next([]);
            return;
        }

        this._charactersLoading.next(true);

        this._guildService.getCharacters(guild.id).subscribe({
            next: characters => {
                this._characters.next(characters);
            },
            complete: () => {
                this._charactersLoading.next(false);
            }
        });

    }

    public getGuildFromToken(token: string) {
        return this._guildService.getGuildFromToken(token);
    }

    public updateReadonlyGuildFromReadonlyToken(token: string) {
        this._guildReadonlyLoading.next(true);

        return this._guildService.getGuildFromReadonlyToken(token).subscribe({
            next: guild => {
                this._guildReadonly.next(guild);
            },
            complete: () => {
                this._guildReadonlyLoading.next(false);
            }
        });
    }

    public joinGuild(guildId: string) {
        return this._guildService.joinGuild(guildId)
    }

    public uploadImportString(importString: string) {
        return this._guildService.uploadImportString(this._guild.value.id, importString);
    }

    public deleteCharacterFromGuild(character: Character) {
        return this._guildService.deleteCharacterFromGuild(this._guild.value.id, character.id).pipe(tap({
            next: () => {
                var characters = this._characters.value;

                var deletedCharacterIndex = characters.findIndex(c => c.id === character.id);

                characters.splice(deletedCharacterIndex, 1);

                this._characters.next(characters);
            }
        }));
    }

    public getTransactionCount(guildId: string) {
        this._guildService.getTransactionCount(guildId).subscribe({
            next: (count: number) => this._transactionCount.next(count)
        });
    }

    public getPageOfTransactions(guildId: string, page: number, pageSize: number) {
        //transactions loading
        //guild loaded?

        if (page != this._transactionPage.value)
            this._transactionPage.next(page);

        this._guildService.getPageOfTransactions(guildId, page, pageSize).subscribe({
            next: items => this._transactions.next(items)
        })
    }

    public getItemRequests() {
        if (!this._guild.value) {
            this._itemRequests.next([]);
            return this.itemRequests$;
        }

        this._itemRequestsLoading.next(true);

        return this._guildService.getItemRequests(this._guild.value.id).pipe(tap({
            next: itemRequests => {
                this._itemRequests.next(itemRequests);
            },
            complete: () => {
                this._itemRequestsLoading.next(false);
            }
        }));
    }

    public getMyItemRequests() {
        if (!this._guild.value) {
            this._myItemRequests.next([]);
            return this.myItemRequests$;
        }

        this._myItemRequestsLoading.next(true);

        return this._guildService.getMyItemRequests(this._guild.value.id).pipe(tap({
            next: itemRequests => {
                this._myItemRequests.next(itemRequests);
            },
            complete: () => {
                this._myItemRequestsLoading.next(false);
            }
        }));
    }

    public approveItemRequest(itemRequestId: string) {
        return this._guildService.approveItemRequest(itemRequestId, this._guild.value.id).pipe(tap({
            next: () => {
                var itemRequests = this._itemRequests.value;

                var approvedItemRequestIndex = itemRequests.findIndex(itemRequest => itemRequest.id === itemRequestId);

                itemRequests[approvedItemRequestIndex].status = "Approved";

                this._itemRequests.next(itemRequests);
            }
        }));
    }

    public denyItemRequest(itemRequestId: string) {
        return this._guildService.denyItemRequest(itemRequestId, this._guild.value.id).pipe(tap({
            next: () => {
                var itemRequests = this._itemRequests.value;

                var approvedItemRequestIndex = itemRequests.findIndex(itemRequest => itemRequest.id === itemRequestId);

                itemRequests[approvedItemRequestIndex].status = "Denied";

                this._itemRequests.next(itemRequests);
            }
        }));
    }
}
