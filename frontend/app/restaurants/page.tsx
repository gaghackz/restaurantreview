"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiJson } from "@/lib/api";

type Restaurant = {
  id: number;
  name: string;
  address?: string | null;
  city?: string | null;
};

export default function Page() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    apiJson<Restaurant[]>("/api/v1/restaurants")
      .then(setRestaurants)
      .catch((e) => setError(e.message));
  }, []);
  return (
    <main className="page-shell directory-page">
      <div className="directory-heading">
        <div>
          <p className="eyebrow">The neighbourhood guide</p>
          <h1>Find your next favourite table.</h1>
          <p className="page-intro">
            A considered collection of places worth making time for.
          </p>
        </div>
        <span className="directory-count">
          {restaurants.length.toString().padStart(2, "0")} places
        </span>
      </div>
      {error && <p className="form-error">{error}</p>}
      {!restaurants.length && !error && (
        <p className="loading-copy">Setting the tables...</p>
      )}
      <div className="restaurant-grid">
        {restaurants.map((restaurant, index) => (
          <Link
            className="restaurant-card"
            key={restaurant.id}
            href={`/restaurants/${restaurant.id}`}
          >
            <span
              className={`restaurant-image restaurant-image-${(index % 4) + 1}`}
              aria-hidden="true"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
            </span>
            <span className="restaurant-card-body">
              <span className="restaurant-meta">
                {restaurant.city || "Local favourite"}
              </span>
              <strong>{restaurant.name}</strong>
              <span className="restaurant-address">
                {restaurant.address || "Details and reviews inside"}
              </span>
              <span className="card-arrow" aria-hidden="true">
                ↗
              </span>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
