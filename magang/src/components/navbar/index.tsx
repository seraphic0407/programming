import { NavLink } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-logo">
        ♫ MusicFeast
      </NavLink>

      <nav className="navbar-menu">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/event">Event</NavLink>
        <NavLink to="/ticket">Tiket Saya</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </header>
  );
};
