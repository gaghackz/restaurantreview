import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A better way to choose dinner</p>
          <h1>Good food is worth talking about.</h1>
          <p className="hero-lede">
            Find the places locals love, share the meals you remember, and make
            your next table the right one.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/sign-up">
              Start exploring <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/sign-in">
              Already a member? Sign in
            </Link>
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="A warmly lit restaurant table"
          role="img"
        >
          <div className="art-note">Notes from the table</div>
          <div className="art-plate" />
          <div className="art-candle" />
          <p className="art-caption">Where every opinion has a place.</p>
        </div>
      </section>
      <section className="home-band">
        <div>
          <p className="eyebrow">Made for curious eaters</p>
          <h2>Skip the star rating. Read the story.</h2>
        </div>
        <div className="value-grid">
          <article>
            <span className="value-number">01</span>
            <h3>Explore honestly</h3>
            <p>
              Browse restaurants and find the details that make a place feel
              like yours.
            </p>
          </article>
          <article>
            <span className="value-number">02</span>
            <h3>Leave your mark</h3>
            <p>
              Share what you ordered, how it felt, and what you would tell a
              friend.
            </p>
          </article>
          <article>
            <span className="value-number">03</span>
            <h3>Keep discovering</h3>
            <p>
              Build a better local food map, one thoughtful review at a time.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
