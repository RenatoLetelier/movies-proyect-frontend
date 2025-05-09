import "./NavbarComponent.css";
import React from "react";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user } = useAuth();

  const handleClick = () => {
    window.localStorage.removeItem("loggedUserJSON");
    window.location.reload();
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <a href="/">Temporal Name</a>
          <a href="/home">Home</a>
          <a href="/movies">Movies</a>
          <a href="/series">Series</a>
          <a href="/photos">Photos</a>
        </div>
        <div className="navbar-right">
          <a href={user ? "#" : "/login"} className="profile-link">
            {user ? (
              <>
                <span onClick={handleClick}>Log out |</span>
                <span>{user.username}</span>
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="User"
                />
              </>
            ) : (
              <span>Log in |</span>
            )}
          </a>
        </div>
      </div>
    </nav>
  );
}
