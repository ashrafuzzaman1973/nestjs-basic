import { Injectable,Inject,forwardRef } from '@nestjs/common';
import {UsersService} from "../user/users.service";

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(()=> UsersService)) private readonly userService : UsersService) {
    }

    isAuthenticated : Boolean = false ;
    login(email: string, password: string){
      const user = this.userService.users.find(u=> u.email === email && u.password === password);
      if(user){
          this.isAuthenticated = true;
          return 'MY_TOKEN';
      }
      return "User does not exist";
    }
}
