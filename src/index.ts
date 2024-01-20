import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from 'hono/logger'
import finance from "../routes/finances";
import { config } from "dotenv";
import users from "../routes/users";
import {cors} from "hono/cors";

config();
const app = new Hono({
  strict: false,
});
app.use("*", logger());
app.use("*", cors());

app.route("/api/auth", users);
app.route("/api/portfolio", finance);

app.get("/", (c) => {
  return c.json(
    {
      message: Date.now() * 1000
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
);
