import {
    BadRequestException,
    HttpException, HttpStatus,
    Injectable,
    NotFoundException,
    RequestTimeoutException
} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dtos/create-user.dto";
import {Profile} from "../profile/profile.entity";
import {ConfigService} from "@nestjs/config";
import {UserAlreadyExistsException} from "../CustomExceptions/user-already-exist.exception";

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

        try {
            userDto.profile = userDto.profile ?? {}

            const existingUserWithUsername = await this.userRepository.findOne({
                where :[{username: userDto.username}]
            })

            if (existingUserWithUsername){
                throw new UserAlreadyExistsException('username',userDto.username)
            }

            const existingUserWithEmail = await this.userRepository.findOne({
                where :[{email: userDto.email}]
            })

            if (existingUserWithEmail){
                throw new UserAlreadyExistsException('email',userDto.email)
            }

            // @ts-ignore
            let user = this.userRepository.create(userDto);

            return await this.userRepository.save(user);
        }catch(err){
            if (err.code === "ECONNREFUSED"){
                throw new RequestTimeoutException('An error occurred while create user',{
                        description : "Could not connect to the database",
                    }
                );
            }
            throw err;

        }

     }


    public async deleteUser(id: number) {

        await this.userRepository.delete(id);

        return { deleted: true };
    }

    public async findUserById(id:number){
       const user =await this.userRepository.findOneBy({
            id
        })

        if (!user){
            throw new HttpException({
                status:HttpStatus.NOT_FOUND,
                error: 'The user with id'+id+' has not been found'
            },HttpStatus.NOT_FOUND,{
                description :'the exception occurred '
            });
        }

        return user;
    }
}