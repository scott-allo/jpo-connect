import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css"; // <-- Ajoute cette ligne pour Tailwind
import "leaflet/dist/leaflet.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);