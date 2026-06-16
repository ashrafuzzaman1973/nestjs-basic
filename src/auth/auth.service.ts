import { Injectable,Inject,forwardRef } from '@nestjs/common';
import {UsersService} from "../user/users.service";

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(()=> UsersService)) private readonly userService : UsersService) {
    }

    isAuthenticated : Boolean = false ;
    login(email: string, password: string){

    }
}
