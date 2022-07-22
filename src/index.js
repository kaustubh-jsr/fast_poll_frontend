import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";
import { Home, PollCreated, PollResults, SubmitVote } from "./pages";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/new/:id" element={<PollCreated />} />
          <Route path="/poll/:id" element={<SubmitVote />} />
          <Route path="/poll/results/:id" element={<PollResults />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
);
