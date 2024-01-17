import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from 'hono/logger'
import {jwt} from 'hono/jwt';
import { config } from "dotenv";
import users from "../routes/users";

config();
const app = new Hono({
  strict: false,
});
app.use("*", logger());

app.route("/api/auth", users);

app.get("/", (c) => {
  return c.json(
    {
      message: "Hello Hono",
    },
    200
  );
});

const port = process.env.port || 5000;

serve(
  {
    fetch: app.fetch,
    port: port as number,
  },
  () => console.log(`Server is running on port http://localhost:${port}`)
);
