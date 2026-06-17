import {Controller, Get} from '@nestjs/common';
import {TweetService} from "./tweet.service";

@Controller('tweet')
export class TweetController {
    constructor(private tweetService: TweetService) {}

    //http://localhost:3000/tweet/101
    @Get() // Matches both /tweet/ and /tweet/123
    public GetTweets() {
    }


}
