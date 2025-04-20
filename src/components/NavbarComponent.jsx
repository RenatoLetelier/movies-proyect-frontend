import "./NavbarComponent.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user } = useAuth();

  const handleClick = () => {
    window.localStorage.removeItem("loggedUserJSON");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="navbar-home">
          Home
        </a>
      </div>

      <div className="navbar-center">
        <a href="/movies" className="navbar-link">
          Películas
        </a>
        <a href="/series" className="navbar-link">
          Series
        </a>
        <a href="/photos" className="navbar-link">
          Fotos
        </a>
      </div>

      <div className="navbar-right">
        <a href={user ? "#" : "/login"} className="profile-link">
          {user ? (
            <>
              <img
                src="https://randomuser.me/api/portraits/men/46.jpg"
                alt="Profile"
                className="profile-img"
              />
              <span>{user.username}</span>
              <span onClick={handleClick} className="logout-btn">
                Log out
              </span>
            </>
          ) : (
            <span>Log in</span>
          )}
        </a>
      </div>
    </nav>
  );
}
