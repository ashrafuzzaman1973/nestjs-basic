import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength
} from "class-validator";

export class CreateUserDto {
    @IsString({message:'Name should be a string value'})
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    firstName:string;

    @IsString({message:'Name should be a string value'})
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    lastName:string;

    @IsString()
    @IsOptional()
    @MaxLength(10)
    gender?: string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(100)
    password : string;

}