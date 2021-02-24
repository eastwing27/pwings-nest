import { Body, Controller, Post, Res } from '@nestjs/common';
import { ReturningStatementNotSupportedError } from 'typeorm';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService){ }

    @Post('register')
    async register(@Body() dto: UserDTO, @Res() response) {
        return await this.userService.create(dto)
            .then(
                () => response.status(200),
                err => response.status(400).send({message: err}));
    }
}
