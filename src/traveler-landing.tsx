import "./traveler-landing.css";

const appHref = "https://local-ledger-henna.vercel.app/?app=1";
// Release owners supply the signed APK URL; never substitute an invented file.
const releaseUrl = import.meta.env.VITE_ANDROID_APK_URL as string | undefined;
const apkUrl = releaseUrl && /^https:\/\//i.test(releaseUrl) ? releaseUrl : undefined;

const day = [
  [
    "☀️",
    "MORNING",
    "make a little space for something new",
    "Create your Local Ledger profile and introduce yourself to the community.",
  ],
  [
    "👀",
    "SHORTLY AFTER",
    "see what’s happening around you",
    "Explore activities on the map, browse people, or create a plan of your own.",
  ],
  [
    "💬",
    "AFTERNOON",
    "turn a hello into a plan",
    "Join an activity and use its group chat to work out the details together.",
  ],
  [
    "📍",
    "EVENING",
    "take the connection offline",
    "Use the activity’s meeting location to plan your meetup. Choose a public place and let someone know your plans.",
  ],
  [
    "🥂",
    "LATER",
    "a new experience, a memory to keep",
    "Your created and joined plans stay together in My activities. The memories are yours to make.",
  ],
];

export function TravelerLanding() {
  return (
    <div className="ll-landing">
      <a className="ll-skip" href="#main">
        Skip to content
      </a>
      <header className="ll-header">
        <a className="ll-brand" href="/" aria-label="Local Ledger home">
          <img src="/app-icon.svg" width="34" height="34" alt="" />
          local ledger
        </a>
        <nav aria-label="Main navigation">
          <a className="ll-nav-story" href="#story">
            our story
          </a>
          <a className="ll-nav-day" href="#your-day">
            a day with us
          </a>
          <a className="ll-button ll-small" href={appHref}>
            open the app <span aria-hidden="true">→</span>
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="ll-hero" aria-labelledby="ll-hero-title">
          <span className="ll-doodle ll-doodle-one" aria-hidden="true">
            ✳︎
          </span>
          <span className="ll-doodle ll-doodle-two" aria-hidden="true">
            ♡
          </span>
          <span className="ll-doodle ll-doodle-three" aria-hidden="true">
            ✧
          </span>
          <span className="ll-pill">a little more connection. a little more adventure.</span>
          <h1 id="ll-hero-title">
            go solo.
            <br />
            find <em>your people.</em>
          </h1>
          <p>
            A shared plan. A new conversation. Someone to explore with.
            <br className="ll-desktop-break" /> Meet fellow travelers through real activities,
            wherever your day takes you.
          </p>
          <div className="ll-actions">
            <a className="ll-button" href={appHref}>
              find your next connection <span aria-hidden="true">→</span>
            </a>
            <a className="ll-button ll-secondary" href="#your-day">
              how it works <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="ll-caption">independently built, with a traveler’s heart ♡</p>
          <div className="ll-interest-row" aria-label="Activity categories">
            <span>☕ coffee & conversation</span>
            <span>🧭 a little exploring</span>
            <span>🍜 food & good company</span>
          </div>
        </section>

        <section
          className="ll-features ll-section"
          id="experiences"
          aria-labelledby="ll-features-title"
        >
          <span className="ll-eyebrow">REAL ACTIVITIES. REAL PEOPLE.</span>
          <h2 id="ll-features-title">
            a small hello.
            <br />a whole new possibility.
          </h2>
          <p className="ll-intro">
            You bring the curiosity. Local Ledger gives you a place to find a plan and the people to
            share it with.
          </p>
          <div className="ll-feature-layout">
            <figure className="ll-app-figure">
              <img
                src="/images/app-signin.webp"
                alt="Actual Local Ledger welcome screen with email sign-in and account creation"
                width="430"
                height="844"
                loading="lazy"
              />
              <figcaption>a peek inside the real app</figcaption>
            </figure>
            <div className="ll-feature-list">
              <article>
                <span aria-hidden="true">🗺️</span>
                <div>
                  <h3>find a plan nearby</h3>
                  <p>
                    Explore activities on the map. See the location, time and who’s going before you
                    join.
                  </p>
                </div>
              </article>
              <article>
                <span aria-hidden="true">🙌</span>
                <div>
                  <h3>make room for your kind of day</h3>
                  <p>Create an activity, pick a meeting spot and invite others to be part of it.</p>
                </div>
              </article>
              <article>
                <span aria-hidden="true">💬</span>
                <div>
                  <h3>say hello before you go</h3>
                  <p>Use activity group chats to introduce yourself and agree on the details.</p>
                </div>
              </article>
              <a className="ll-text-link" href={appHref}>
                take a look around <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="ll-day ll-section" id="your-day" aria-labelledby="ll-day-title">
          <h2 id="ll-day-title">
            here’s what your day
            <br />
            could look like
          </h2>
          <ol className="ll-timeline">
            {day.map(([icon, time, title, text]) => (
              <li key={time}>
                <span className="ll-timeline-icon" aria-hidden="true">
                  {icon}
                </span>
                <div>
                  <span className="ll-time">{time}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="ll-caption">a possible day, at your own pace. no pressure.</p>
        </section>

        <section className="ll-founder ll-section" id="story" aria-labelledby="ll-story-title">
          <img
            className="ll-founder-photo"
            src="/images/rajnikant.webp"
            width="112"
            height="112"
            loading="lazy"
            alt="Rajnikant Dhar Dwivedi, founder of Local Ledger, outdoors in a red shirt"
          />
          <span className="ll-pill ll-love">♥ made with love by a solo traveler</span>
          <h2 id="ll-story-title">why i built local ledger</h2>
          <div className="ll-story-copy">
            <p>
              I’m Rajnikant, a solo traveler and the founder of Local Ledger. I’m building this
              around a simple idea: you should be able to travel independently and still have a way
              to connect with other people.
            </p>
            <p>
              Local Ledger brings profiles, shared activities and conversations into one place. My
              hope is that a small hello can become a shared plan, and that finding company feels a
              little more natural.
            </p>
            <p>
              I want this to feel like a community you can be part of at your own pace. Because
              traveling alone should always be a choice, not a limitation.
            </p>
          </div>
          <p className="ll-founder-signature">— Rajnikant Dhar Dwivedi, Founder 🤝</p>
        </section>

        <section className="ll-note ll-section" aria-labelledby="ll-note-title">
          <span className="ll-note-heart" aria-hidden="true">
            ♡
          </span>
          <h2 id="ll-note-title">a little note from me ♡</h2>
          <div className="ll-note-copy">
            <p>Hey, I’m Rajnikant.</p>
            <p>
              Thank you for taking a moment to be here. Local Ledger is an independent project, and
              I’m building it with care for the people who will use it.
            </p>
            <p>
              I hope you’ll make it your own: introduce yourself, share a plan, or start with a
              simple hello. There’s no perfect way to be part of a community.
            </p>
            <p>
              Look after yourself, respect each other’s boundaries, and keep a little room for a new
              connection. I hope Local Ledger becomes a small, useful part of your next adventure.
            </p>
            <p className="ll-handwritten">
              with love,
              <br />
              Rajnikant
            </p>
          </div>
        </section>

        <section className="ll-faq ll-section" id="questions" aria-labelledby="ll-faq-title">
          <h2 id="ll-faq-title">a few things you might wonder</h2>
          <div className="ll-faq-list">
            <details>
              <summary>what can i do on Local Ledger?</summary>
              <p>
                Create a profile, explore and create activities, join plans, browse community
                profiles, and chat with the people in an activity.
              </p>
            </details>
            <details>
              <summary>can i use it without downloading anything?</summary>
              <p>
                Yes. <a href={appHref}>Open Local Ledger in your browser</a> and sign in or create
                an account.
              </p>
            </details>
            <details>
              <summary>how should i plan a meetup?</summary>
              <p>
                Chat about the details first, meet in a public place, tell someone you trust where
                you’re going, and leave if you feel uncomfortable. A profile or photo check does not
                guarantee someone’s identity or safety.
              </p>
            </details>
            <details>
              <summary>where can i get the Android app?</summary>
              <p>
                {apkUrl ? (
                  <>
                    Download the Android APK using the button below. Android may ask you to allow
                    installation from your browser.
                  </>
                ) : (
                  "A signed Android APK is not linked here yet. You can use the web app now."
                )}{" "}
                Local Ledger is not currently released on Google Play or the App Store.
              </p>
            </details>
          </div>
        </section>

        <section className="ll-join ll-section" id="download" aria-labelledby="ll-join-title">
          <span aria-hidden="true" className="ll-join-spark">
            ✳︎
          </span>
          <h2 id="ll-join-title">
            your next story could
            <br />
            start with a hello.
          </h2>
          <p>bring your curiosity. find a little company.</p>
          <div className="ll-actions">
            <a className="ll-button" href={appHref}>
              open local ledger <span aria-hidden="true">→</span>
            </a>
            {apkUrl ? (
              <a className="ll-button ll-secondary" href={apkUrl} download>
                download Android APK ↓
              </a>
            ) : null}
          </div>
          <p className="ll-caption">
            {apkUrl
              ? "Android APK · direct download"
              : "available on the web · Android download coming when ready"}
          </p>
        </section>
      </main>
      <footer className="ll-footer">
        <a className="ll-brand" href="/">
          <img src="/app-icon.svg" width="30" height="30" alt="" />
          local ledger
        </a>
        <p>real activities. real people. a little closer.</p>
        <nav aria-label="Footer navigation">
          <a href="#story">our story</a>
          <a href="#questions">questions & safety</a>
          <a href={appHref}>open the app →</a>
        </nav>
        <small>© {new Date().getFullYear()} Local Ledger · made with love by Rajnikant ♡</small>
      </footer>
    </div>
  );
}
