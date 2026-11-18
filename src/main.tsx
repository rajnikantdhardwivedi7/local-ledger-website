import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TravelerLanding } from "./traveler-landing";
import { FounderBlog } from "./founder-blog";
import { BlogIndex } from "./blog-index";
import "./base.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>{window.location.pathname.replace(/\/$/, "") === "/blog/why-i-built-local-ledger" ? <FounderBlog /> : window.location.pathname.replace(/\/$/, "") === "/blog" ? <BlogIndex /> : <TravelerLanding />}</StrictMode>,
);
