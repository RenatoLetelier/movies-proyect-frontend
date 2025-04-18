import "./NavbarComponent.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user } = useAuth();

  const handleClick = () => {
    window.localStorage.removeItem("loggedUserJSON");
    window.location.reload();
  }

  return (
    <nav className="navbar">
    <a href="/" className="navbar-home">Home</a>
    <div className="navbar-profile">
        <a href={user ? "#" : "/login"} className="profile-link">
            {user ? (
                <>
                    <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Profile" className="profile-img" />
                    <span>{user.username}</span>
                    <span onClick={handleClick}>Log out</span>
                </>
            ) : (
                <span>Log in</span>
            )}
        </a>
    </div>
  </nav>
  );
}
