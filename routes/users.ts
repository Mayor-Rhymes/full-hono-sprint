import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { checkUserExists, createUser } from "../controllers/users";
import { authMiddleware } from "../middlewares/authMiddleware";


const users = new Hono();
//Tester
users.use("/", jwt({ secret: process.env.JWT_SECRET as string }));

users.get("/", authMiddleware, (c) => {
  const user = c.get("user" as never);
  if(!user){
    return c.json({message: "User does not exist"}, 400)
  }
  return c.json({message: user}, 200);

});


users.post("/signup", ...createUser);

users.post("/login", ...checkUserExists);

export default users;
