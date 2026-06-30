import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const ActiveUsers = createParamDecorator((field:string | undefined,context:ExecutionContext)=>{
  const request = context.switchToHttp().getRequest();
  return request.user;
});