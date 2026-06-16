import { Injectable } from '@nestjs/common';
import {UsersService} from "../user/users.service";

@Injectable()
export class TweetService {
    constructor(private readonly userService : UsersService) {}

    getTweets(userId: number | undefined) {

    }

}
