import { Router } from "express";

import {
  createReview,
  getReview,
  getRestaurantReviews,
} from "../controllers/reviewController";

const reviewRouter: Router = Router();

// Create a review
// POST /api/v1/reviews
reviewRouter.post("/", createReview);

// Get a single review
// GET /api/v1/reviews/:id
reviewRouter.get("/:id", getReview);

// Get all reviews for a restaurant
// GET /api/v1/reviews/restaurant/:restaurantId
reviewRouter.get("/restaurant/:restaurantId", getRestaurantReviews);

export default reviewRouter;
