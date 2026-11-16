import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TravelerLanding } from "./traveler-landing";
import "./base.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><TravelerLanding /></StrictMode>,
);
