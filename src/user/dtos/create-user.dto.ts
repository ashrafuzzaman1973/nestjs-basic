import {
    IsEmail,
    IsNotEmpty, IsOptional,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";
import {CreateProfileDto} from "../../profile/dtos/create-profile.dto";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @MaxLength(24)
    username:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(100)
    password : string;

    @IsOptional()
    profile: CreateProfileDto | null;

}