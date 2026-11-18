import "./blog.css";

const appUrl = "https://local-ledger-henna.vercel.app/?app=1";
export function FounderBlog() {
  return <div className="ll-blog">
    <header className="ll-blog-nav"><a href="/">← local ledger</a><a href={appUrl}>open the app ↗</a></header>
    <main>
      <p className="ll-blog-eyebrow">A NOTE FROM THE FOUNDER · THE STORY BEHIND LOCAL LEDGER</p>
      <h1>some journeys begin long before you pack your bags.</h1>
      <p className="ll-blog-lead">Why I started building Local Ledger, what it means to me, and why I believe traveling alone should never mean feeling disconnected.</p>
      <div className="ll-blog-byline"><img src="/images/rajnikant.webp" alt="Rajnikant Dhar Dwivedi" width="52" height="52"/><span>Rajnikant Dhar Dwivedi<br/><small>Founder of Local Ledger · Solo traveler</small></span></div>
      <img className="ll-blog-cover" src="/images/app-map.webp" alt="A glimpse of the Local Ledger travel activity map"/>
      <article>
        <h2>it started with a feeling.</h2>
        <p>There is something beautiful about traveling solo. You get to choose your own route, follow your curiosity, and discover what a place means to you without having to follow anyone else's plan. But independence and connection aren't opposites. Sometimes, even when you're enjoying your own company, you wish there were someone to share a coffee, a walk, a conversation, or an unexpected detour with.</p>
        <p>I'm Rajnikant, a solo traveler and the person building Local Ledger. That feeling stayed with me. Not because every journey needs company, but because finding it should be easier when you want it.</p>
        <h2>the idea became a project.</h2>
        <p>I started working on Local Ledger in 2025. At first, it was an idea I kept returning to: what if meeting another traveler didn't have to depend entirely on luck? What if you could find a shared plan, understand who you might be meeting, and start with a simple hello?</p>
        <p>Building a product around that question meant thinking beyond a beautiful interface. I had to consider what a traveler actually needs: a way to explore activities, create plans, discover profiles, talk through details, and make their own choices about meeting up. I wanted the experience to feel welcoming without pretending that trust can be reduced to a badge or a button.</p>
        <h2>from sketches to something you can open.</h2>
        <p>Local Ledger gradually took shape as a web application. I worked on the pieces that make a connection possible: profiles, an activity map, creating and joining plans, conversations, and a selfie-to-profile-photo comparison flow. Some parts are still being refined. That's the reality of building something independently: you make progress, test, find what doesn't work, and improve it.</p>
        <p>I didn't want to wait for a perfect app-store launch before sharing the idea. The website is live, and people can explore Local Ledger on the web while the Android release is prepared. I would rather be transparent about what is ready than promise features that aren't there yet.</p>
        <h2>why the little moments matter.</h2>
        <p>When people talk about travel, they often talk about destinations. I think just as much about the moments in between: deciding where to go next, asking someone for a recommendation, sitting down for a meal, or discovering that a stranger has a story you never expected to hear.</p>
        <p>That's what I hope Local Ledger makes room for. Not forced friendships. Not endless swiping. Just a more natural way for people who love exploring to find a shared experience, if and when they want one.</p>
        <h2>the journey is still beginning.</h2>
        <p>I started this in 2025, and I'm still building it. There are features to improve, rough edges to smooth out, and a community to earn the trust of. I know an app alone can't guarantee meaningful connections or anyone's safety. But it can make the first step a little less difficult.</p>
        <p>If Local Ledger helps even two people turn an unfamiliar place into a good memory, that would mean something to me. And if you're reading this while planning your next solo journey, I hope you keep that curiosity. Go on your own terms. Meet people on your own terms. Come home with stories that belong to you.</p>
        <p className="ll-blog-signoff">with love,<br/><strong>Rajnikant Dhar Dwivedi</strong><br/>founder, local ledger ♡</p>
      </article>
      <div className="ll-blog-end"><h2>your next story starts somewhere.</h2><p>Explore Local Ledger, or follow along as I keep building.</p><div><a href={appUrl}>open local ledger ↗</a><a href="https://www.instagram.com/local.ledger/" target="_blank" rel="noopener noreferrer">instagram @local.ledger ↗</a></div></div>
    </main>
    <footer><a href="/">← back to local ledger</a><span>made with love by a solo traveler ♡</span></footer>
  </div>;
}
