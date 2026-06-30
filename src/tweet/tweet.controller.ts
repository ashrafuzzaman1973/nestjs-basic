import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req} from '@nestjs/common';
import {TweetService} from "./tweet.service";
import {Tweet} from "./tweet.entity";
import {CreateTweetDto} from "./dto/create-tweet.dto";
import {UpdateTweetDto} from "./dto/update-tweet.dto";
import {PaginationQueryDto} from "../common/pagination/dto/pagination-query.dto";
import {Paginated} from "../common/pagination/paginater.interface";
import {ActiveUsers} from "../auth/decorators/active-user.decorators";

@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService) {}

    //http://localhost:3000/tweet/101
    @Get(':userid')
    public GetTweets(
        @Param('userid',ParseIntPipe) userid: number,
        @Query() paginationQueryDto: PaginationQueryDto,
    ):Promise<Paginated<Tweet>> {
        return this.tweetService.getTweets(userid,paginationQueryDto);
    }

    @Post()
    public createTweet(@Body() tweet: CreateTweetDto,@ActiveUsers() user) {
        console.log(user);
       //return this.tweetService.createTweet(tweet);
    }

    @Patch()
    public updateTweet(@Body() updateTweetDto: UpdateTweetDto) {
        return this.tweetService.updateTweet(updateTweetDto);
    }

    @Delete(':id')
    public deleteTweet(@Param('id',ParseIntPipe) id: number){
        return this.tweetService.deleteTweet(id);
    }

}
