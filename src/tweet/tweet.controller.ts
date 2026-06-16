import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {TweetService} from "./tweet.service";

@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService) {}

    //http://localhost:3000/tweet/101
    @Get(['', ':userid']) // Matches both /tweet/ and /tweet/123
    public GetTweets(
        @Param('userid', new ParseIntPipe({ optional: true })) userid?: number,
    ) {
        return this.tweetService.getTweets(userid);
    }


}
