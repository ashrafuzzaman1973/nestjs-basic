import { Injectable } from '@nestjs/common';
import {PaginationQueryDto} from "./dto/pagination-query.dto";
import {FindManyOptions, FindOptionsWhere, ObjectLiteral, Repository} from "typeorm";

@Injectable()
export class PaginationProvider {
    public async paginateQuery<T extends ObjectLiteral>(
        paginationQueryDto: PaginationQueryDto,
        repository: Repository<T>,
        where?: FindOptionsWhere<T>
    ){
        const findOptions:FindManyOptions<T> ={
            skip: ((paginationQueryDto.page ?? 1)-1) * (paginationQueryDto.limit ?? 10),
            take:paginationQueryDto.limit
        }
        if(where){
            findOptions.where = where
        }

        const result = await repository.find(findOptions)
        const totalItems:number = await repository.count();
        // @ts-ignore
        const totalPages:number = Math.ceil(totalItems / paginationQueryDto.limit);
        const currentPage = paginationQueryDto.page;

        // @ts-ignore
        const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
        // @ts-ignore
        const prevPage =  currentPage === 1 ? currentPage : currentPage - 1;
        const response = {
            data : result,
            meta :{
                itemPerPage : paginationQueryDto.limit,
                totalItems : totalItems,
                currentPage : paginationQueryDto.page,
                totalPages : totalPages
            },
            links :{
                first : string,
                last : string,
                current : currentPage,
                next : nextPage,
                previous : prevPage
            }
        }
        return result
    }
}
