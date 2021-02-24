import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "../user/user.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    time: Date;

    @Column()
    amount: number;

    @ManyToOne(type => User, User => User.outgoingTransactions)
    sender: User;
    
    @ManyToOne(type => User, User => User.incomingTransactions)
    reciever: User;
}