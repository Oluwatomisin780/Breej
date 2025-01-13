import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

type User = {
  email: string;
  password: string;
  referal_code?: string;
  profile: Profile;
};

type Profile = {
  first_name: string;
  last_name: string;
  phone_no: string;
  address: string;
};

type Login = {
  email: string;
  password: string;
};
export const signUp = async (user: User): Promise<any> => {
  const hashedPassword = await bcrypt.hash(user.password, 12);
  console.log(hashedPassword);
  const userData = await prisma.user.create({
    data: {
      email: user.email,
      password: hashedPassword,
      referal_code: user.referal_code,
      profile: {
        create: {
          ...user.profile,
        },
      },
    },
    include: {
      profile: true,
    },
  });
  return {
    status: 200,
    message: 'user  successfully signup',
    data: userData,
  };
};

//login
export const login = async (loginDetails: Login) => {
  const user = await prisma.user.findUnique({
    where: {
      email: loginDetails.email,
    },
  });

  if (!user)
    return {
      status: 404,
      message: 'user not found',
    };
  const validatePass = await bcrypt.compare(
    loginDetails.password,
    user.password
  );
  if (!validatePass)
    return {
      status: 400,
      message: 'invalid user password',
    };

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET_KEY || 'some',
    {
      expiresIn: '1h',
    }
  );
  return {
    status: 200,
    message: 'user succcessfully signIn',
    data: user,
    token,
  };
};
