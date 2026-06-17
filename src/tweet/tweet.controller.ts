import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import {TweetService} from "./tweet.service";
import {Tweet} from "./tweet.entity";
import {CreateTweetDto} from "./dto/create-tweet.dto";

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


}
