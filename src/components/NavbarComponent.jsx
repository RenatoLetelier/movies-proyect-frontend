import "./NavbarComponent.css";
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
          <a href="#">Temporal Name</a>
          <div className="navbar-links">
            <span>|</span>
            <a href="/">Home</a>
            <a href="/movies">Movies</a>
            <a href="/series">Series</a>
            <a href="/photos">Photos</a>
          </div>
        </div>
        <div className="navbar-right">
          <div className="profile-link">
            {user ? (
              <>
                <span onClick={handleClick}>Log out</span>
                <span>|</span>
                <span>{user.username}</span>
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="User"
                />
              </>
            ) : (
              <>
                <a href="/login">Log in</a>
                <span>|</span>
                <a href="/register">Sign up</a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
