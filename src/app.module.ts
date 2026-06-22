import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { TweetModule } from './tweet/tweet.module';
import {UsersModule} from "./user/users.module";
import { AuthModule } from './auth/auth.module';
import {User} from "./user/user.entity";
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';

@Module({
  imports: [UsersModule, TweetModule, AuthModule, TypeOrmModule.forRootAsync({
    imports : [],
    inject : [],
   useFactory : () =>({
     type : "postgres",
     //entities : [User],
     autoLoadEntities : true,
     synchronize : true,
     host: "localhost",
     port: 5432,
     username: "postgres",
     password: "admin123",
     database: "nestjs"
   })
  }), ProfileModule, HashtagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
