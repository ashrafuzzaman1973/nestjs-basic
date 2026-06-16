import { Injectable } from '@nestjs/common';
import {UsersService} from "../user/users.service";

@Injectable()
export class TweetService {
    constructor(private readonly userService : UsersService) {}
    tweets : { text : String, date : Date,userId : Number}[]=
        [
            { text : "Some tweet", date : new Date('2026-11-12'),userId: 1},
            { text : "Some other tweet", date : new Date('2025-08-12'),userId: 1},
            { text : "Some more tweet", date : new Date('2024-05-12'),userId: 2}
        ];

    getTweets(userId: number | undefined) {
        const user = this.userService.getUserById(userId);
        const tweets = this.tweets.filter(t =>t.userId === userId);
        const response = tweets.map( t => { // @ts-ignore
            return { text : t.text, date: t.date , name: user.name}})
        return response;
    }

}
