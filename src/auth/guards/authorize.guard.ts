import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import * as config from "@nestjs/config";
import authConfig from "../config/auth.config";
import {Reflector} from "@nestjs/core";

@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(authConfig.KEY)
        private readonly authConfiguration: config.ConfigType<typeof authConfig>,
        private readonly reflector: Reflector
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride('isPublic',[
            context.getHandler(),
            context.getClass()
        ]);

        if(isPublic){
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if(!token){
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token,this.authConfiguration);
            request.user = payload;

            console.log(payload);
        }catch (error){
            throw new UnauthorizedException();
        }
        return true;
    }

}