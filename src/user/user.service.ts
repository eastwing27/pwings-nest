import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { IsNullOrWhiteSpace } from '../utils/stringUtils';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>
    ) {}

    findAll(): Promise<User[]> { return this.repository.find(); }
    
    findSome(searchString: string): Promise<User[]> { 
        return this.repository.createQueryBuilder('user')
            .where(`user.email LIKE '%${searchString}%' OR user.name LIKE '%${searchString}%'`)
            .execute();
    }

    find(promise: Promise<User>): Promise<User|string> { 
        return new Promise<User> (async (resolve, reject) => { 
            const user = await promise;
            if (!user)
                return reject("No user found");
            
            return resolve(user);
        })
    }

    findById(id: number): Promise<User|string> {
        return this.find(this.repository.findOne({id: id}));
    }

    findByEmail(email: string): Promise<User|string> {
        return this.find(this.repository.findOne({email: email}));
    }

    create(dto: UserDTO): Promise<User|string> { 
        return new Promise<User|string>(async (resolve, reject) => {
                if(!dto || IsNullOrWhiteSpace(dto.email) || IsNullOrWhiteSpace(dto.password))
                    return reject("Invalid user data");

                try{
                    const user = await this.repository.create(dto);
                    await this.repository.save(user);
                    return resolve(user);
                }
                catch (err){
                    return reject(err.message || err);
                }
        }) 
    }

    refill(userId: number, amount: number): Promise<number|string> {
        return new Promise<number|string>(async (resolve, reject) => {
            if (!userId || !Number.isInteger(+userId))
                return reject("Invalid user ID");

            if (!amount || !Number.isInteger(+amount) || +amount < 1)
                return reject("Invalid amount value");

            try {
                const user = await this.repository.findOne({id: +userId});
                if (!user)
                    return reject(`User #${userId} not found`);

                user.balance += amount;
                await this.repository.save(user);
                return resolve(user.balance);
            }
            catch (err){
                return reject(err.message || err);
            }
        })
    }

    delete(id: number): Promise<string> { 
        return new Promise<string> (async (resolve, reject) => {
            if (!id || !Number.isInteger(+id))
                return reject("Invalid user ID");

            try {
                const user = await this.repository.findOne({id: +id});
                if (!user)
                    return reject(`User #${id} not found`);

                await this.repository.remove(user);
                return resolve("ok");
            }
            catch(err){
                return reject(err.message || err);
            }
        });
    }
}
