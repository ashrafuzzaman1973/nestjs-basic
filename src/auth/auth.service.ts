import {Injectable, Inject, forwardRef, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../user/users.service";
import type { ConfigType } from '@nestjs/config';
import authConfig from "./config/auth.config";
import {CreateUserDto} from "../user/dtos/create-user.dto";
import {LoginDto} from "./dto/login.dto";
import {HashingProvider} from "./provider/hashing.provider";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(()=>UsersService))
        private readonly userService : UsersService,
        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
        @Inject(HashingProvider)
        private readonly hashingProvider: HashingProvider,
        private readonly jwtService: JwtService
    ) {
    }

    isAuthenticated : Boolean = false ;
    public async login(loginDto : LoginDto)  {
        const user = await this.userService.findUserByUsername(loginDto.username);

        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }

        let isEqual: boolean = false;

        isEqual = await this.hashingProvider.comparePassword(
            loginDto.password,
            user.password,
        );

        if (!isEqual) {
            throw new UnauthorizedException('Invalid username or password');
        }

       const token = await this.jwtService.signAsync({
           sub:user.id,
           email:user.email
       },{
           secret : this.authConfiguration.secret,
           expiresIn: this.authConfiguration.expiresIn,
           audience : this.authConfiguration.audience,
           issuer : this.authConfiguration.issuer
       });

        return {
            token: token
        }
    }

    public async signup(createUserDto: CreateUserDto){
        return await this.userService.createUser(createUserDto)
    }
}
