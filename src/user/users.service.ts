import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "./dtos/create-user.dto";

@Injectable()
export class UsersService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}


     getAllUsers(){
        return this.userRepository.find();
     }


    public async createUser(userDto : CreateUserDto){
        const user = await this.userRepository.findOne({
            where : { email : userDto.email}
        })

        if(user){
            return "The user already exists";
        }

       let newUser = this.userRepository.create(userDto)
        newUser = await this.userRepository.save(newUser)
        return newUser;
     }
}