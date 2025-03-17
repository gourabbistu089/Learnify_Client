// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { BrowserRouter, RouterProvider } from "react-router-dom";
// import { Provider } from "react-redux";
// import store from "./redux/store.js";
// import { Toaster } from "react-hot-toast";

// createRoot(document.getElementById("root")).render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//         <Toaster />
//       </BrowserRouter>
//     </Provider>
// );
import React from "react";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader.jsx";

// Lazy load the App component
const LazyApp = React.lazy(() => import("./App.jsx"));

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <LazyApp />
          <Toaster />
        </Suspense>
      </BrowserRouter>
    </Provider>
  // </StrictMode>
);