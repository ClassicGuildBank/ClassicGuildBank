import { TransactionDetail } from "./transactionDetail";

export class Transaction {
    public characterName: string;
    public gold: number = 0;
    public transactionType: string;
    public transactionDate: Date;   
    public transactionDetails: TransactionDetail[];
    
    public get goldAmt() { return Math.floor(this.gold / 10000) }
    public get silverAmt() { return Math.floor((this.gold / 100) % 100); }
    public get copperAmt() { return this.gold % 100; }

    constructor(init?: Partial<Transaction>){
        if (init) {
            Object.assign(this, init);

            if( init.transactionDate )
                this.transactionDate = new Date(init["transactionDate"])
        }
    }
}