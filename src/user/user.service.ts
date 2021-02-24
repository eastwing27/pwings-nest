import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}

    findAll(): Promise<User[]> { return this.repository.find(); }

    findById(id: number): Promise<User> { return this.repository.findOne(id) }
    findByEmail(email: string): Promise<User> { return this.repository.findOne({email: email}) }

    async create(dto: UserDTO): Promise<void> { await this.repository.create(dto) }

    async delete(id: number): Promise<void> { await this.repository.delete(id) }
}
