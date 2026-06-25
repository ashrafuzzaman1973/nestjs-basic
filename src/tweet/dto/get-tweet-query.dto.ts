import {IsDate, IsOptional} from "class-validator";
import {IntersectionType} from "@nestjs/mapped-types";
import {PaginationQueryDto} from "../../common/pagination/dto/pagination-query.dto";

class GetTweetBaseDto {
    @IsOptional()
    @IsDate()
    startdate?:Date;

    @IsOptional()
    @IsDate()
    enddate?:Date;
}

export class GetTweetQueryDto extends IntersectionType(
    GetTweetBaseDto,
    PaginationQueryDto
){

}