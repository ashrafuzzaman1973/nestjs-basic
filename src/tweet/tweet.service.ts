import { Injectable} from '@nestjs/common';
import {UsersService} from "../user/users.service";
import {Repository} from "typeorm";
import {Tweet} from "./tweet.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateTweetDto} from "./dto/create-tweet.dto";

@Injectable()
export class TweetService {

    constructor(private readonly userService: UsersService,
                @InjectRepository(Tweet) private readonly tweetRepository : Repository<Tweet>
                ) {
    }
   public async getTweets(userId: number) {
      return await this.tweetRepository.find({
            where: {user: {id: userId}},
            relations: { user: true}
        })
   }

    public async createTweet(createTweetDto: CreateTweetDto) {
        let user:any =await this.userService.findUserById(createTweetDto.userId);

        let tweet = this.tweetRepository.create({...createTweetDto,user:user})

        return await this.tweetRepository.save(tweet)
    }

}
