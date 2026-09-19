"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { apiJson } from "@/lib/api";

type Restaurant = {
  id: number;
  name: string;
  address?: string | null;
  city?: string | null;
};
type Review = {
  id: number;
  content: string;
  createdAt: string;
  user?: { name: string };
};

export default function RestaurantPage() {
  const params = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [session, setSession] = useState<any>(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([
      apiJson<Restaurant>(`/api/v1/restaurants/${params.id}`),
      apiJson<{ reviews: Review[] }>(`/api/v1/reviews/restaurant/${params.id}`),
      apiJson<any>("/api/auth/get-session"),
    ])
      .then(([place, reviewData, currentSession]) => {
        setRestaurant(place);
        setReviews(reviewData.reviews || []);
        setSession(currentSession);
      })
      .catch((e) => setError(e.message));
  }, [params.id]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      await apiJson("/api/v1/reviews", {
        method: "POST",
        body: JSON.stringify({
          restaurantId: Number(params.id),
          userId: session?.user?.id,
          content,
        }),
      });
      setReviews((current) => [
        {
          id: Date.now(),
          content: content.trim(),
          createdAt: new Date().toISOString(),
          user: { name: session.user.name },
        },
        ...current,
      ]);
      setContent("");
      setMessage("Your note has been added.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Review could not be sent");
    }
  }

  if (error && !restaurant)
    return (
      <main className="page-shell">
        <p className="form-error">{error}</p>
        <Link className="text-link" href="/restaurants">
          Back to restaurants
        </Link>
      </main>
    );
  if (!restaurant)
    return (
      <main className="page-shell">
        <p className="loading-copy">Finding the right table...</p>
      </main>
    );
  return (
    <main className="page-shell detail-page">
      <Link className="back-link" href="/restaurants">
        ← All restaurants
      </Link>
      <section className="detail-hero">
        <div className="detail-art restaurant-image-2">
          <span>R / {String(restaurant.id).padStart(2, "0")}</span>
        </div>
        <div className="detail-heading">
          <p className="eyebrow">{restaurant.city || "Local favourite"}</p>
          <h1>{restaurant.name}</h1>
          <p className="detail-address">
            {restaurant.address || "A place worth sharing."}
          </p>
        </div>
      </section>
      <section className="review-layout">
        <div className="review-list">
          <div className="section-heading">
            <p className="eyebrow">From the table</p>
            <h2>
              {reviews.length} {reviews.length === 1 ? "note" : "notes"}
            </h2>
          </div>
          {reviews.length ? (
            reviews.map((review) => (
              <article className="review-item" key={review.id}>
                <p>“{review.content}”</p>
                <div>
                  <strong>{review.user?.name || "A local guest"}</strong>
                  <span>
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <p className="loading-copy">
              Be the first person to leave a note about this place.
            </p>
          )}
        </div>
        <aside className="review-form-wrap">
          <p className="eyebrow">Your turn</p>
          <h2>What stayed with you?</h2>
          <form onSubmit={submit} className="review-form">
            <textarea
              rows={7}
              placeholder="The dish, the mood, the little detail..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <button className="button" disabled={!session}>
              Share your note <span aria-hidden="true">↗</span>
            </button>
          </form>
          {!session && (
            <p className="form-hint">Sign in to share your experience.</p>
          )}
          {message && <p className="form-success">{message}</p>}
          {error && <p className="form-error">{error}</p>}
        </aside>
      </section>
    </main>
  );
}
