import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TravelerLanding } from "./traveler-landing";
import { FounderBlog } from "./founder-blog";
import { BlogIndex } from "./blog-index";
import { CommunityGuidelines } from "./community-guidelines";
import "./base.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>{window.location.pathname.replace(/\/$/, "") === "/blog/why-i-built-local-ledger" ? <FounderBlog /> : window.location.pathname.replace(/\/$/, "") === "/blog" ? <BlogIndex /> : window.location.pathname.replace(/\/$/, "") === "/community-guidelines" ? <CommunityGuidelines /> : <TravelerLanding />}</StrictMode>,
);
