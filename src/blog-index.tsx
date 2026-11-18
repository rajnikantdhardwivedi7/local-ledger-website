import "./blog.css";

const posts = [
{icon:"❤️",category:"FOUNDER STORY",title:"why i built local ledger",description:"A personal story about solo travel, a small idea in 2025, and building a place for meaningful connections.",date:"November 2026",read:"5 min read",url:"/blog/why-i-built-local-ledger"},
{icon:"🧭",category:"SOLO TRAVEL",title:"how to meet people while traveling solo",description:"Thoughtful ways to start conversations, find shared activities, and connect at your own pace.",date:"Coming soon",read:"Guide in progress"},
{icon:"🛡️",category:"SAFETY",title:"meeting new people: the little things that matter",description:"Practical reminders for choosing public meeting places, sharing plans, and respecting boundaries.",date:"Coming soon",read:"Guide in progress"},
{icon:"☕",category:"COMMUNITY",title:"the beauty of a simple hello",description:"Why the smallest shared moments can become the stories you remember.",date:"Coming soon",read:"Essay in progress"},
{icon:"📍",category:"PRODUCT",title:"inside local ledger: activities, maps and conversations",description:"A look at the tools we're building to help travelers turn ideas into shared plans.",date:"Coming soon",read:"Product update in progress"},
{icon:"🌍",category:"BUILDING IN PUBLIC",title:"building local ledger, one step at a time",description:"A behind-the-scenes journal of making an independent travel community app.",date:"Coming soon",read:"Development notes in progress"}
];
export function BlogIndex(){
return <div className="ll-blog ll-blog-index">
<header className="ll-blog-nav"><a href="/">← local ledger</a><a href="https://www.instagram.com/local.ledger/" target="_blank" rel="noopener noreferrer">instagram ↗</a></header>
<main><p className="ll-blog-eyebrow">THE LOCAL LEDGER JOURNAL</p><h1>stories for the journey.</h1><p className="ll-blog-lead">Notes on solo travel, finding your people, building Local Ledger, and all the little moments in between.</p>
<div className="ll-blog-post-grid">{posts.map(post=><article className="ll-blog-post" key={post.title}><div className="ll-blog-post-icon" aria-hidden="true">{post.icon}</div><span className="ll-blog-eyebrow">{post.category}</span><h2>{post.title}</h2><p>{post.description}</p><div className="ll-blog-post-bottom"><small>{post.date} · {post.read}</small>{post.url?<a href={post.url}>read story →</a>:<span>coming soon</span>}</div></article>)}</div>
<section className="ll-blog-end"><h2>let's make more stories.</h2><p>Follow the journey or explore Local Ledger today.</p><div><a href="https://local-ledger-henna.vercel.app/?app=1">open the app ↗</a><a href="https://www.instagram.com/local.ledger/" target="_blank" rel="noopener noreferrer">@local.ledger ↗</a></div></section></main><footer><a href="/">← back home</a><span>made with love by a solo traveler ♡</span></footer></div>;
}