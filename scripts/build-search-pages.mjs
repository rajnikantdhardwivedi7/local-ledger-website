import { readFile, writeFile } from "node:fs/promises";

const template = await readFile("dist/index.html", "utf8");
const origin = "https://local-ledger-henna.vercel.app";
const pages = [
  ["/", "index", "Local Ledger | Meet Solo Travelers Through Nearby Activities", "Find people to explore with through nearby activities and group chats. Discover Local Ledger and download the Android app."],
  ["/blog", "blog", "Local Ledger Blog | Stories About Solo Travel", "Read stories from the people building Local Ledger, a community for solo travelers."],
  ["/blog/why-i-built-local-ledger", "founder-story", "Why I Built Local Ledger | Founder Story", "Rajnikant Dhar Dwivedi shares why he built Local Ledger and how shared activities can bring solo travelers together."],
  ["/community-guidelines", "community-guidelines", "Community Guidelines | Local Ledger", "Read the community guidelines for joining activities, chatting with other travelers, and using Local Ledger respectfully."]
];

for (const [path, file, title, description] of pages) {
  const url = origin + path;
  const organization = {"@type":"Organization","@id":origin+"/#organization",name:"Local Ledger",url:origin+"/",logo:origin+"/app-icon.svg",sameAs:["https://www.instagram.com/local.ledger/"]};
  const graph = [organization,{"@type":"WebSite","@id":origin+"/#website",url:origin+"/",name:"Local Ledger",publisher:{"@id":organization["@id"]}},{"@type":path==="/blog"?"CollectionPage":"WebPage","@id":url+"#webpage",url,name:title,description,isPartOf:{"@id":origin+"/#website"}}];
  if(path==="/") graph.push({"@type":"SoftwareApplication",name:"Local Ledger",applicationCategory:"TravelApplication",operatingSystem:"Android, Web",url:origin+"/",downloadUrl:"https://local-ledger-henna.vercel.app/downloads/local-ledger.apk",description,publisher:{"@id":organization["@id"]}});
  const metadata = '<meta property="og:site_name" content="Local Ledger" />\n    <meta name="twitter:title" content="'+title+'" />\n    <meta name="twitter:description" content="'+description+'" />\n    <script type="application/ld+json">'+JSON.stringify({"@context":"https://schema.org","@graph":graph}).replace(/</g,"\\u003c")+'</script>';
  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta (?:name="description"|property="og:description") content=")[^"]*/g, `$1${description}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${title}`)
    .replace("</head>", `  <link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />\n  </head>`);
  await writeFile(`dist/${file}.html`, html.replace("</head>", metadata+"\n  </head>"));
}
