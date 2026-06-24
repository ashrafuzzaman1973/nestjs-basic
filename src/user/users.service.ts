import {Injectable, NotFoundException, RequestTimeoutException} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dtos/create-user.dto";
import {Profile} from "../profile/profile.entity";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,

        private readonly configService: ConfigService
    ) {}


     public async getAllUsers(){
        try {
            return await this.userRepository.find({
                relations: {
                    profile : true
                }
            });
        }catch(err){
            throw new RequestTimeoutException('An error occurred while getting all users',{
                description : "Could not connect to the database",
                }
                );
        }

     }


    public async createUser(userDto : CreateUserDto){
        userDto.profile = userDto.profile ?? {}

        // @ts-ignore
        let user = this.userRepository.create(userDto);

        return await this.userRepository.save(user);
     }


    public async deleteUser(id: number) {

        await this.userRepository.delete(id);

        return { deleted: true };
    }

    public async findUserById(id:number){
       return  await this.userRepository.findOneBy({
            id
        })
    }
}