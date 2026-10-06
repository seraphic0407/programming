import { Navigate, Route, Routes } from "react-router-dom";

import { Landing } from "./pages/landing";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Event } from "./pages/event";
import { Gallery } from "./pages/gallery";
import { Ticket } from "./pages/ticket";
import { About } from "./pages/about";
import { Profile } from "./pages/profile";

import "./App.css";

export const App = () => {
  const isLoggedIn = localStorage.getItem("user") !== null;

  return (
    <Routes>
      {/* public */}
      <Route path="/" element={<Landing />} />

      <Route path="/login" element={<Login />} />

      {/* protected */}
      <Route
        path="/home"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/event"
        element={isLoggedIn ? <Event /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/gallery"
        element={isLoggedIn ? <Gallery /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/ticket"
        element={isLoggedIn ? <Ticket /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/about"
        element={isLoggedIn ? <About /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/profile"
        element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
      />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
