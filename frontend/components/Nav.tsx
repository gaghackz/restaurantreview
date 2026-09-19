import Link from "next/link";

export default function Nav() {
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/">
          <span className="brand-mark">R</span>
          <span>Rove &amp; Relish</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/restaurants">Explore</Link>
          <Link href="/leaderboard">Leaderboard</Link>
        </nav>
        <div className="nav-actions">
          <Link className="nav-sign-in" href="/sign-in">
            Sign in
          </Link>
          <Link className="button button-small" href="/sign-up">
            Join the table
          </Link>
        </div>
      </div>
    </header>
  );
}
