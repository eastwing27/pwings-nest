import { Entity, PrimaryGeneratedColumn, Unique, Column, OneToMany } from "typeorm"
import { Transaction } from '../transaction/transaction.entity'

@Entity()
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string = '';

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    balance: number = 0;

    @OneToMany(type => Transaction, Transaction => Transaction.sender)
    outgoingTransactions: Transaction[];

    @OneToMany(type => Transaction, Transaction => Transaction.receiver)
    incomingTransactions: Transaction[];
}