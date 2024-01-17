import { Context, Next } from "hono";
import { createFactory } from "hono/factory";
import { prisma } from "../config/db";

const factory = createFactory();

export const authMiddleware = factory.createMiddleware(
  async (c: Context, next: Next) => {
    const payload = c.get("jwtPayload");
    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    console.log(user);

    if (user) {
      c.set("user", user);
      await next();
    }
  }
);
