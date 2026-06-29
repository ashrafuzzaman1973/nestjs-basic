import { Injectable,Inject,forwardRef } from '@nestjs/common';
import {UsersService} from "../user/users.service";
import type { ConfigType } from '@nestjs/config';
import authConfig from "./config/auth.config";
import {CreateUserDto} from "../user/dtos/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        @Inject(UsersService)
        private readonly userService : UsersService,
        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
    ) {
    }

    isAuthenticated : Boolean = false ;
    login(email: string, password: string){

        console.log(this.authConfiguration)
    }

    public async signup(createUserDto: CreateUserDto){
        return await this.userService.createUser(createUserDto)
    }
}
