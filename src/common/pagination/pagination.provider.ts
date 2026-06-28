import {Inject, Injectable} from '@nestjs/common';
import { REQUEST} from "@nestjs/core";
import express from "express";
import {PaginationQueryDto} from "./dto/pagination-query.dto";
import {FindManyOptions, FindOptionsRelations, FindOptionsWhere, ObjectLiteral, Repository} from "typeorm";
import {Paginated} from "./paginater.interface";

@Injectable()
export class PaginationProvider {

    constructor(
        @Inject(REQUEST) private readonly request: express.Request
    ) {
    }
    public async paginateQuery<T extends ObjectLiteral>(
        paginationQueryDto: PaginationQueryDto,
        repository: Repository<T>,
        where?: FindOptionsWhere<T>,
        relations?:FindOptionsRelations<T>
    ):Promise<Paginated<T>>{
        const findOptions:FindManyOptions<T> ={
            skip: ((paginationQueryDto.page ?? 1)-1) * (paginationQueryDto.limit ?? 10),
            take:paginationQueryDto.limit
        }
        if(where){
            findOptions.where = where
        }

        if(relations){
            // @ts-ignore
            findOptions.relations = relations
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
        const baseUrl = this.request.protocol+'://'+this.request.headers.host+'/';
        const newUrl = new URL(this.request.url,baseUrl);
        const response :Paginated<T> = {
            data : result,
            meta :{
                itemPerPage : paginationQueryDto.limit ?? 10,
                totalItems : totalItems,
                currentPage : paginationQueryDto.page ?? 1,
                totalPages : totalPages
            },
            links :{
                first : `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=1`,
                last : `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${totalPages}`,
                current : `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${currentPage}`,
                next : `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${nextPage}`,
                previous : `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${prevPage}`
            }
        }
        return response
    }
}
