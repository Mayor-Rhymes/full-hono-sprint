import { prisma } from "../config/db";
import { hash } from "bcrypt";
import { User, UserExists } from "../lib/utils/types";
import { compare } from "bcrypt";
import { sign as signjwt } from "jsonwebtoken";
import { createFactory } from "hono/factory";
import { zValidator } from "@hono/zod-validator";
import { userExistsSchema, userSchema } from "../lib/utils/zodSchemas";




const factory = createFactory();

//action that creates a new user and adds it to the database

export const createUser = factory.createHandlers(
  zValidator("json", userSchema),
  async (c) => {
    const userData = c.req.valid("json") as User;

    const hashedPassword = await hash(userData.password, 10);

    //purpose => check if email already exists
    const emailExists = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    //purpose => check if username already exists
    const usernameExists = await prisma.user.findUnique({
      where: {
        username: userData.username,
      },
    });

    //if either of the variables evaluate to true, send this error
    if (emailExists || usernameExists) {
      return c.json(
        { message: "User with username or email already exists" },
        400
      );
    }

    //add new user to the database
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        username: userData.username,
        password: hashedPassword,
      },
    });

    console.log(user);

    if (!user) {
      return c.json({ message: "Please enter all the right credentials" }, 415);
    }

    const accessToken = signjwt(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "10m" }
    );
    const refreshToken = signjwt(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "30d" }
    );
    const fullUser = { ...user, accessToken, refreshToken };
    return c.json({ message: "You are signed up", user: fullUser }, 201);
  }
);

//action that checks if a user exists. Will be used for login
export const checkUserExists = factory.createHandlers(
  zValidator("json", userExistsSchema),
  async (c) => {
    const userData = c.req.valid("json") as UserExists;

    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      return c.json({ message: "No such user exists" }, 400);
    }

    const passwordCorrect = await compare(userData.password!, user.password);
    if (!passwordCorrect) {
      return c.json({ message: "Password is incorrect" }, 400);
    }
    const accessToken = signjwt(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "10m" }
    );
    const refreshToken = signjwt(
      { id: user.id, username: user.username },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "30d" }
    );

    const fullUser = { ...user, accessToken, refreshToken };
    return c.json({ message: "You are logged in", user: fullUser }, 201);
  }
);



const handleRefreshToken = () => {

    
}

//protected
// export const changeInfo = async (c: Context) => {
//   const userData = c.req.valid("json" as never) as UserExists;
//   const password = c.req.query("password");

//   const user = await prisma.user.findUnique({
//     where: {
//       email: userData.email,
//     },
//   });

//   if (!user) {
//     return c.json({ message: "No such user exists" }, 400);
//   }

//   const passwordCorrect = await compare(userData.password!, user.password);
//   if (!passwordCorrect) {
//     return c.json({ message: "Password is incorrect" }, 400);
//   }
// };
