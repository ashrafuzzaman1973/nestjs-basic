import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {TweetService} from "./tweet.service";
import {Tweet} from "./tweet.entity";
import {CreateTweetDto} from "./dto/create-tweet.dto";
import {UpdateTweetDto} from "./dto/update-tweet.dto";

@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService) {}

    //http://localhost:3000/tweet/101
    @Get(':userid')
    public GetTweets(@Param('userid',ParseIntPipe) userid: number){
        return this.tweetService.getTweets(userid);
    }

    @Post()
    public createTweet(@Body() tweet: CreateTweetDto) {
       return this.tweetService.createTweet(tweet);
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
