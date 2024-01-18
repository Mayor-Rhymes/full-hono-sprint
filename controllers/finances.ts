import { Factory } from "hono/factory";
import { prisma } from "../config/db";
import { zValidator } from "@hono/zod-validator";
import { portfolioSchema } from "../lib/utils/zodSchemas";
import { stockDataType } from "../lib/utils/types";

const factory = new Factory();

export const getPortfolios = factory.createHandlers(async (c) => {
  const portfolios = await prisma.tolerance.findMany({ take: 11 });
  if (!portfolios || portfolios.length === 0) {
    return c.json({ message: "NO portfolios" }, 400);
  }
  return c.json({ message: "Fetched all portfolios", portfolios }, 200);
});


export const getPortfolio = factory.createHandlers(async (c) => {

    const portfolio = await prisma.tolerance.findUnique({

        where:{
            Tolerance: Number(c.req.param("id"))
        }
    });


    if(!portfolio){
        return c.json({message: "None found"}, 400);
    } 

    return c.json({message: "Portfolio found", portfolio }, 200);
})



export const createPortfolio = factory.createHandlers(
  zValidator("json", portfolioSchema),
  async (c) => {
    const portfolioData = (await c.req.valid("json")) as stockDataType;

    const toleranceExists = await prisma.tolerance.findUnique({
      where: {
        Tolerance: portfolioData["Tolerance"],
      },
    });

    if (toleranceExists) {
      return c.json(
        { message: "Portfolio with this tolerance already exists" },
        400
      );
    }
    const portfolio = await prisma.tolerance.create({
      data: {
        Tolerance: portfolioData["Tolerance"],
        NigerianStocks: portfolioData["Nigerian Stocks"],
        ForeignStocks: portfolioData["Foreign Stocks"],
        TechStocks: portfolioData["Tech Stocks"],
        EmergingStocks: portfolioData["Emerging Stocks"],
        NigerianBonds: portfolioData["Nigerian Bonds"],
        ForeignBonds: portfolioData["Foreign Bonds"],
        Commodities: portfolioData["Commodities"],
        RealEstate: portfolioData["Real Estate"],
        TBills: portfolioData["T-Bills"],
        Alternative: portfolioData["Alternative"],
      },
    });

    if (!portfolio) {
      return c.json({ message: "Could not create portfolio" }, 400);
    }

    return c.json({ message: "Portfolio created", portfolio }, 200);
  }
);
