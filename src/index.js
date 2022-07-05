import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<TutorialsList />} />
        <Route path="tutorials" element={<TutorialsList />} />
        <Route path="add" element={<AddTutorial />} />
        <Route path="tutorial/:id" element={<Tutorial />} />
      </Route>
    </Routes>
  </BrowserRouter>
);