import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

/**
 * Create a new review
 *
 * POST /api/v1/reviews
 */
export async function createReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { restaurantId, userId, content } = req.body;

    // Basic validation
    if (!restaurantId || !userId || !content) {
      return res.status(400).json({
        error: "restaurantId, userId and content are required",
      });
    }

    if (typeof content !== "string" || content.trim().length === 0) {
      return res.status(400).json({
        error: "Review content cannot be empty",
      });
    }

    // Check that the restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: Number(restaurantId),
      },
    });

    if (!restaurant) {
      return res.status(404).json({
        error: "Restaurant not found",
      });
    }

    // Check that the user exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        restaurantId: Number(restaurantId),
        userId: userId,
        content: content.trim(),
      },
    });

    res.status(201).json({
      message: "Review submitted successfully",
      review,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get a single review
 *
 * GET /api/v1/reviews/:id
 */
export async function getReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Invalid review ID",
      });
    }

    const review = await prisma.review.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            city: true,
          },
        },
      },
    });

    if (!review) {
      return res.status(404).json({
        error: "Review not found",
      });
    }

    res.json(review);
  } catch (error) {
    next(error);
  }
}

/**
 * Get all reviews for a restaurant
 *
 * GET /api/v1/reviews/restaurant/:restaurantId
 */
export async function getRestaurantReviews(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const restaurantId = Number(req.params.restaurantId);

    if (Number.isNaN(restaurantId)) {
      return res.status(400).json({
        error: "Invalid restaurant ID",
      });
    }

    // Check restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
    });

    if (!restaurant) {
      return res.status(404).json({
        error: "Restaurant not found",
      });
    }

    const reviews = await prisma.review.findMany({
      where: {
        restaurantId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
      },
      reviews,
    });
  } catch (error) {
    next(error);
  }
}
