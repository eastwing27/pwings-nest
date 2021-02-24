import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private repository: Repository<Transaction>
    ) {}

    findAll(): Promise<Transaction[]> { return this.repository.find(); }

    findById(id: number): Promise<Transaction> { return this.repository.findOne(id) }

    async remove(id: number): Promise<void> { await this.repository.delete(id) }
}
