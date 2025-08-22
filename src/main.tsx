import React from "react";
import { createRoot } from "react-dom/client";
import { setupIonicReact } from "@ionic/react";
import App from "./App";
import "./styles/global.css";

/* Ionic core + utilidades */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Swiper (si usas el carrusel en Home) */
import "@ionic/react/css/ionic-swiper.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { AuthProvider } from "./context/AuthContext";

/* Fix de íconos Leaflet (si usas mapas) */

setupIonicReact();
createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
