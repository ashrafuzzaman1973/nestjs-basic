import {Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from "../user/users.service";
import {Repository} from "typeorm";
import {Tweet} from "./tweet.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateTweetDto} from "./dto/create-tweet.dto";
import {HashtagService} from "../hashtag/hashtag.service";
import {UpdateTweetDto} from "./dto/update-tweet.dto";
import {PaginationQueryDto} from "../common/pagination/dto/pagination-query.dto";
import {PaginationProvider} from "../common/pagination/pagination.provider";

@Injectable()
export class TweetService {

    constructor(private readonly userService: UsersService,
                private readonly hashtagService: HashtagService,
                @InjectRepository(Tweet) private readonly tweetRepository : Repository<Tweet>,
                private readonly paginationProvider : PaginationProvider
                ) {
    }
   public async getTweets(userId: number,pageQueryDto:PaginationQueryDto) {
       let user:any =await this.userService.findUserById(userId);
       if (!user){
           throw new NotFoundException(`User with id ${userId} not found.`);
       }

       return await this.paginationProvider.paginateQuery(
           pageQueryDto,
           this.tweetRepository,
           {user : {id:userId}}
       );
   }

    public async createTweet(createTweetDto: CreateTweetDto) {
        let user:any =await this.userService.findUserById(createTweetDto.userId);

        let hashtags:any = await this.hashtagService.findByHashtags(createTweetDto.hashtags ?? [])

        let tweet = this.tweetRepository.create({...createTweetDto,user:user,hashtags:hashtags})

        return await this.tweetRepository.save(tweet)
    }


    public async updateTweet(updateTweetDto:UpdateTweetDto){

        let hashtags:any = await this.hashtagService.findByHashtags(updateTweetDto.hashtags ?? []);

        let tweet = await this.tweetRepository.findOneBy({
            id: updateTweetDto.id
        })

        if (!tweet) {
            throw new NotFoundException('Tweet not found');
        }

        tweet.text = updateTweetDto.text ?? tweet.text;

        tweet.image = updateTweetDto.image ?? tweet.image;

        tweet.hashtags = hashtags;

        return await this.tweetRepository.save(tweet);
    }

    public async deleteTweet(id: number) {
        await this.tweetRepository.delete({
            id: id
        })

        return { deleted : true ,id}
    }

}
