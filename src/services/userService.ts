import { Role } from '@prisma/client';
import { createUser, findUserByEmail } from '../Repositories/userRepository';
import { CustomError } from '../utils/customError';
import { hashPassword } from '../helpers/passwordHelper';

export const createUserService = async (data: { email: string, password: string,name:string,role:Role }) => {

    // check email already exits
    const isUserExist= await findUserByEmail(data?.email)

    if(isUserExist){
        throw new CustomError("User with same email already exits",400)
    }

    const hashedPassword = await hashPassword(data?.password);

    const user = await createUser({...data,password:hashedPassword})


    return { data:user,message:"User created successfully" }

};

export const createAdminUserService = async (data: { email: string, password: string,name:string }) => {

    // check email already exits
    const isUserExist= await findUserByEmail(data?.email)

    if(isUserExist){
        throw new CustomError("User with same email already exits",400)
    }

    const hashedPassword = await hashPassword(data?.password);

    const user = await createUser({...data,password:hashedPassword,role:"ADMIN"})


    return { data:user,message:"User created successfully" }

};