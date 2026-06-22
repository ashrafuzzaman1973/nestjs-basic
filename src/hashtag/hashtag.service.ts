import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Hashtag} from "./hashtag.entity";
import {In, Repository} from "typeorm";
import {CreateHashtagDto} from "./dto/create-hashtag.dto";

@Injectable()
export class HashtagService {
    constructor(
        @InjectRepository(Hashtag)
        private readonly hashtagRepository: Repository<Hashtag>) {}

    public async createHashtag(createHashtagDto: CreateHashtagDto) {
        let hashtag = this.hashtagRepository.create(createHashtagDto);
        return await this.hashtagRepository.save(hashtag);
    }

    public async findByHashtags(hashtags: number[]) {
        return await this.hashtagRepository.find({
            where: {
                id: In(hashtags),
            },
        });
    }
}
