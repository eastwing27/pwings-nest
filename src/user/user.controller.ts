import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { response } from 'express';
import { UpdateDateColumn } from 'typeorm';
// import { ReturningStatementNotSupportedError } from 'typeorm';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService){ }

    @Get()
    async getAll(@Res() response) {
        return await this.userService.findAll()
            .then(
                docs => response.status(200).send(docs),
                err => response.status(400).send({message: err.message || err}));
    }

    @Get('search/:searchString')
    async getSome(@Param() params, @Res() response) {
        return await this.userService.findSome(params.searchString)
            .then(
                docs => response.status(200).send(docs),
                err => response.status(400).send({message: err.message || err}));
    }

    @Get(':id')
    async getById(@Param() params, @Res() response){
        return await this.userService.findById(params.id)
            .then(
                doc => response.status(200).send(doc),
                err => response.status(400).send({message: err}));

    }

    @Get('email/:email')
    async getByEmail(@Param() params, @Res() response){
        return await this.userService.findByEmail(params.email)
            .then(
                doc => response.status(200).send(doc),
                err => response.status(400).send({message: err}));

    }

    @Post('register')
    async register(@Body() dto: UserDTO, @Res() response) {
        return await this.userService.create(dto)
            .then(
                doc => response.status(200).send(doc),
                err => response.status(400).send({message: err}));
    }

    
    @Put(':userId/refill/:amount')
    async refill(@Param() params, @Res() response){
        return await this.userService.refill(params.userId, params.amount)
            .then(
                ok => response.status(200).send(ok),
                err => response.status(400).send({message: err}));
    }

    @Delete(':id')
    async delete(@Param() params, @Res() response) {
        return await this.userService.delete(params.id)
            .then (
                ok => response.status(200).send({message: ok}),
                err => response.status(400).send({message: err}));
    }
}
