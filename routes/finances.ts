import { Hono } from "hono";
import { createPortfolio, getPortfolio, getPortfolios } from "../controllers/finances";

const finances = new Hono();


finances.get("/", ...getPortfolios);
finances.post("/", ...createPortfolio);
finances.get("/:id", ...getPortfolio);

export default finances;