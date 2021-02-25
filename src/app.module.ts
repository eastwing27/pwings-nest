import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
// import { Connection } from 'typeorm';
// import { User } from './user/user.entity';
import { TransactionModule } from './transaction/transaction.module';
// import { Transaction } from './transaction/transaction.entity';
// import { UserController } from './user/user.controller';
// import { TransactionController } from './transaction/transaction.controller';
// import { UserService } from './user/user.service';
// import { TransactionService } from './transaction/transaction.service';

@Module({
  imports: [ 
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        //entities: [User, Transaction],
        migrations: [__dirname + "/**/migration/**/*{.ts,.js}"],
        synchronize: true, //TODO: false for prod
  }), UserModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
