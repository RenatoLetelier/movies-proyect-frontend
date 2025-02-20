import "./NavbarComponent.css";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const {user} = useAuth();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    console.log(user);
    setUsername(user ? user.token : null);
  }, [user]);

  return (
    <nav className="navbar">
    <a href="/" className="navbar-home">Home</a>
    <div className="navbar-profile">
        <a href={username ? "#" : "/login"} className="profile-link">
            {username ? (
                <>
                    <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Profile" className="profile-img" />
                    <span>{username}</span>
                </>
            ) : (
                <span>Log in</span>
            )}
        </a>
    </div>
  </nav>
  );
}
