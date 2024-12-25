import { PrismaClient, Role } from '@prisma/client';
import { CustomError } from '../utils/customError';


const prisma = new PrismaClient();

export const ValidateUserByEmail = async (email: string) => {

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })

  if (!user) {
    throw new CustomError('User not found', 404)
  }

  if (!user.isDeleted) {
    throw new CustomError('User not Active', 403)
  }

  return user

};

export const findUserByEmail = async (email: string) => {

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })

  return user

};


export const updateTokenUserById = async (id: string, accessToken: string) => {

  const user = await prisma.user.update({
    where: { id: id },
    data: {
      token: accessToken
    }
  })

  return user

};

export const createUser = async (data:{name:string,email: string, password: string,role:Role}) => {

  const user = await prisma.user.create({
    data: data
  })

  return user

};
