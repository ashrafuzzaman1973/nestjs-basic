import { Injectable } from '@nestjs/common';
import {HashingProvider} from "./hashing.provider";
import * as bcrypt from 'bcrypt';
@Injectable()
export class BcryptProvider implements HashingProvider{
    public async comparePassword(plaintPassword: string | Buffer, hashPassword: string | Buffer): Promise<boolean> {
       return await bcrypt.compare(plaintPassword,hashPassword);
    }

    public async hashPassword(password: string | Buffer): Promise<string> {
      let salt =  await bcrypt.genSalt();

      return await bcrypt.hash(password,salt)
    }

}
