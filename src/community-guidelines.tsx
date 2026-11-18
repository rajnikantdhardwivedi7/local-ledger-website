import "./blog.css";
const sections = [
{title:"Community norms",items:[
["Travel-first community","Local Ledger is designed for people who want to discover places and connect through shared travel plans and activities. It is not a dating or hookup service. Sexual solicitation and unwanted romantic pressure are not welcome."],
["Respect one another","Speak with kindness. Harassment, bullying, threats, intimidation, stalking and repeated unwanted contact are prohibited."],
["No hateful conduct","Do not attack, demean or exclude people because of their identity, background, religion, disability, gender, sexuality or other personal characteristics."],
["Be authentic","Use your own identity and photographs. Do not impersonate someone else, misrepresent your age, or create deceptive accounts."],
["Keep content appropriate","Do not send unsolicited sexual messages or images, or publish explicit or exploitative content."]]},
{title:"Prohibited behavior",items:[
["Violence and exploitation","Threats, physical or sexual misconduct, coercion, exploitation and encouragement of violence are not permitted, online or at gatherings."],
["Adults only","Local Ledger is intended for people aged 18 or older. Do not use the platform to arrange meetings with minors or publish a minor's personal information."],
["Illegal activities","Do not use Local Ledger to arrange, promote or facilitate unlawful activities, including illegal drug sales."],
["Fraud and financial pressure","Scams, impersonation, misleading requests for money, financial manipulation and deceptive fundraising are prohibited."],
["Spam and advertising","Do not send bulk or repetitive messages, deceptive links, unsolicited promotions or irrelevant commercial pitches."],
["Misuse of messaging","Messages should have a genuine connection to travel, community or activities. Repeated unsolicited outreach, including mass generic greetings, may lead to restrictions."],
["Harmful material","Do not share content that encourages self-harm, glorifies serious violence or depicts graphic injury, or content intended to threaten or frighten others."],
["Technical abuse","Automated scraping, unauthorized data collection, bot-driven interactions, attempts to evade enforcement or interference with platform security are prohibited."]]},
{title:"Profiles and privacy",items:[
["Your photos and name","Your profile picture must show you, and your display name should be your real name or a genuine nickname. Do not use someone else's identity."],
["Protect personal details","Avoid publishing your home address, phone number, email, financial information, accommodation details or exact travel schedule in a public profile."],
["Photo comparison limitations","A selfie-to-profile-photo comparison, where available, is not government identity verification and does not establish that another person is safe or trustworthy."]]},
{title:"Chats and communication",items:[
["Respect boundaries","Ask before sharing sensitive details, and stop contacting someone if they say no or do not wish to continue."],
["Stay privacy-conscious","Do not pressure anyone to share their number, private address, accommodation or financial details. Consider keeping early activity planning inside Local Ledger."],
["Be alert to scams","Never send money or sensitive financial information to someone solely because you met through the platform. Verify requests independently."]]},
{title:"Activities and in-person meetups",items:[
["Meet safely","Prefer public, well-populated places. Tell someone you trust about your plans, arrange your own transport when possible, and leave if you feel uncomfortable."],
["Accurate plans","Activity organizers should provide accurate dates, times, locations, capacity and relevant expectations. Participants should confirm details before attending."],
["Follow local rules","All gatherings must comply with applicable laws and venue policies. Do not organize dangerous, disruptive or unlawful activities."],
["Be considerate","If you cannot attend, notify others as early as possible. Repeated disruptive no-shows or intentionally misleading plans may result in moderation."],
["Money and expenses","Agree on costs before meeting. Unless a specific payment feature expressly states otherwise, Local Ledger does not collect or split payments between participants."],
["Independent decisions","Check venues, routes and suggestions yourself. Any automated recommendations can be incomplete or inaccurate."],
["Personal responsibility","Real-world meetups involve risks. Take reasonable precautions and make independent decisions about participation."]]},
{title:"Reporting and enforcement",items:[
["Emergencies","For immediate danger, contact local emergency services or law enforcement. In India, the national emergency response number is 112."],
["Block unwanted contact","If the app provides a blocking control, use it to limit unwanted interactions. Blocking and reporting are separate actions; use the available reporting channel for suspected violations."],
["Report concerns","Report harassment, threats, scams, unsafe activities or other violations using available in-app tools or by contacting the team through our official Instagram account."],
["How we respond","Depending on the circumstances and tools available, Local Ledger may review reports, remove content, issue warnings, restrict features, suspend accounts or permanently remove access. Serious incidents may be referred to appropriate authorities where required."],
["No retaliatory reports","Do not abuse reporting or blocking features to target, harass or intimidate other community members."]]}
];
export function CommunityGuidelines(){
return <div className="ll-blog ll-policy"><a className="ll-skip" href="#policy-main">Skip to main content</a><header className="ll-blog-nav"><a href="/"><img src="/app-icon.svg" width="30" height="30" alt="" style={{marginRight:10}}/>local ledger</a><a href="/">← back to home</a></header><main id="policy-main"><p className="ll-blog-eyebrow">OUR COMMUNITY · SAFETY & RESPECT</p><h1>Community Guidelines</h1><p className="ll-policy-meta">Effective November 18, 2026 · Version 1.0</p><p className="ll-blog-lead">Local Ledger exists to make solo travel feel more connected—without compromising respect, consent or personal safety.</p><p>These guidelines describe the standards we expect from everyone using Local Ledger or participating in gatherings organized through it. They supplement any applicable Terms of Service. We may update them as the community and product evolve.</p><p>Violations can result in content removal, warnings, temporary restrictions, suspension or permanent loss of access, depending on severity and circumstances. Not every safety or moderation feature described here is necessarily available in the current app version.</p><article>{sections.map(section=><section key={section.title}><h2>{section.title}</h2><ul className="ll-policy-list">{section.items.map(([heading,description])=><li key={heading}><strong>{heading}:</strong> {description}</li>)}</ul></section>)}<p className="ll-policy-note">These guidelines are written for Local Ledger and are not a guarantee of identity, conduct or safety. Please exercise your own judgment when interacting with other travelers.</p></article><div className="ll-blog-end"><h2>help us keep the community welcoming.</h2><p>Questions or concerns? Reach out through our official Instagram page.</p><div><a href="https://www.instagram.com/local.ledger/" target="_blank" rel="noopener noreferrer">contact @local.ledger ↗</a><a href="/">back to home</a></div></div></main><footer><a href="/blog">blog</a><a href="/#story">about</a><a href="/community-guidelines">guidelines</a><a href="https://www.instagram.com/local.ledger/" target="_blank" rel="noopener noreferrer">instagram</a><span>© {new Date().getFullYear()} Local Ledger</span></footer></div>
}