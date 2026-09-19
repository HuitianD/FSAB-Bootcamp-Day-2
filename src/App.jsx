import { useEffect, useState } from "react";
import "./App.css";

/*
  FSAB DAY 2 CLASSROOM PRACTICE

  This React page connects to the Express backend in server.cjs.

  Practice 1:
  Open the server greeting and change its text in server.cjs.

  Practice 2:
  Click Join event to send a registration to the server.
  Refresh only the page preview to reload saved registrations.

  Registrations are stored in server memory.
  Restarting the backend clears them.

  Styling is already provided in App.css.
*/

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#home">
        <span className="brand-mark">F</span>
        Full Stack at Brown
      </a>

      <nav aria-label="Main navigation">
        <a href="#events">Events</a>
        <a href="#about">About</a>
      </nav>
    </header>
  );
}

function EventCard({ id, title, time, category = "Community" }) {
  const [joined, setJoined] = useState(false);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");

  // Prepared for students:
  // Read existing registrations when this card appears.
  useEffect(() => {
    let active = true;

    async function loadSavedRegistration() {
      try {
        const response = await fetch("/api/signups", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Could not load registrations.");
        }

        const data = await response.json();

        if (active) {
          setJoined(data.eventIds.includes(id));
          setError("");
        }
      } catch {
        if (active) {
          setError(
            "Could not load registrations. Check the server and refresh."
          );
        }
      } finally {
        if (active) {
          setBusy(false);
        }
      }
    }

    loadSavedRegistration();

    // Ignore a response if this effect is no longer active.
    return () => {
      active = false;
    };
  }, [id]);

  // Clicking Join sends this event's ID to the backend.
  async function handleJoin() {
    if (busy || joined) return;

    setBusy(true);
    setError("");

    try {
      const response = await fetch("/api/signups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: id,
        }),
      });

      if (!response.ok) {
        throw new Error("The server could not register this event.");
      }

      const data = await response.json();

      if (data.joined !== true) {
        throw new Error(
          "The server has not saved the registration yet."
        );
      }

      // Update React state only after the server confirms success.
      setJoined(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not join the event. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="event-card">
      <div className="card-top">
        <span className="category">{category}</span>
        <span className="event-icon" aria-hidden="true">
          ↗
        </span>
      </div>

      <h3>{title}</h3>

      <p className="event-time">{time}</p>

      <p className="event-description">
        Meet other students, try something new, and learn together.
      </p>

      <div className="card-bottom">
        <button
          type="button"
          className="join-button"
          onClick={handleJoin}
          disabled={busy || joined}
        >
          {busy ? "Please wait..." : joined ? "Joined!" : "Join event"}
        </button>

        <p className="join-status" aria-live="polite">
          {error ||
            (busy
              ? "Contacting the server..."
              : joined
                ? "Your registration is saved on the demo server."
                : "Open to beginners")}
        </p>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <div id="home">
      <Header />

      <main>
        <p>
          <a
            href="/api/hello"
            target="_blank"
            rel="noopener noreferrer"
          >
            Practice 1: Open the server greeting ↗
          </a>
        </p>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">THE CAMPUS COLLECTION</p>

            <h1 id="hero-title">
              Find your people.
              <br />
              Build something.
            </h1>

            <p className="hero-description">
              A little curiosity goes a long way. Explore student events
              and make room for something new.
            </p>

            <a className="primary-link" href="#events">
              Explore events <span aria-hidden="true">↗</span>
            </a>
          </div>

          <aside className="hero-note" aria-label="Welcome note">
            <span className="note-symbol" aria-hidden="true">
              ✳
            </span>
            <p className="note-label">YOUR NEXT CHAPTER</p>
            <h2>Bring your curiosity.</h2>
            <p>New skills. New friends. A place to start.</p>
          </aside>
        </section>

        <section id="events" className="events-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MAKE SOME PLANS</p>
              <h2>Something to look forward to</h2>
            </div>
            <p>Sample events for our React workshop</p>
          </div>

          <div className="events-grid">
            <EventCard
              id="web-workshop"
              title="Build Your First Website"
              time="Friday · 6:00–8:00 PM"
              category="Development"
            />

            <EventCard
              id="design-coffee"
              title="Design and Coffee"
              time="Saturday · 10:00–11:30 AM"
              category="Design"
            />

            <EventCard
              id="community-event"
              title="Study Together"
              time="Sunday · 7:00–9:00 PM"
              category="Study"
            />
          </div>
        </section>

        <section id="about" className="about-section">
          <p className="eyebrow">FULL STACK AT BROWN</p>
          <h2>Learning happens when you try.</h2>
          <p>
            We bring students together to explore design and development.
            You don’t need to know everything before you begin.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <span>Full Stack at Brown · Developer Bootcamp</span>
        <p>
          Classroom demo only. Joining does not submit a real registration.
          Registrations are stored temporarily and reset when the backend
          restarts.
        </p>
      </footer>
    </div>
  );
}