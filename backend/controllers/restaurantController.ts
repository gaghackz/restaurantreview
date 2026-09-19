import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });


export async function getRestaurants(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const restaurants = await prisma.restaurant.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(restaurants);
  } catch (error) {
    next(error);
  }
}

export async function getRestaurant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid restaurant ID",
      });
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id,
      },
    });

    if (!restaurant) {
      return res.status(404).json({
        error: "Restaurant not found",
      });
    }

    res.json(restaurant);
  } catch (error) {
    next(error);
  }
}

export async function createRestaurant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, address, city } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Restaurant name is required",
      });
    }

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        address,
        city,
      },
    });

    res.status(201).json(restaurant);
  } catch (error) {
    next(error);
  }
}