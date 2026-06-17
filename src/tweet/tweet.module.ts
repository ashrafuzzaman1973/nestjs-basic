import { Module } from '@nestjs/common';
import { TweetController } from './tweet.controller';
import { TweetService } from './tweet.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Tweet} from "./tweet.entity";
import {UsersModule} from "../user/users.module";

@Module({
  controllers: [TweetController],
  providers: [TweetService],
  imports : [UsersModule,TypeOrmModule.forFeature([Tweet])]
})
export class TweetModule {}
