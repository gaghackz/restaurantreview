import { Router } from "express";

import {
  getRestaurants,
  getRestaurant,
  createRestaurant,
} from "../controllers/restaurantController";

const restaurantRouter: Router = Router();

restaurantRouter.get("/", getRestaurants);
restaurantRouter.get("/:id", getRestaurant);
restaurantRouter.post("/", createRestaurant);

export default restaurantRouter;
