import { useNavigate } from "react-router-dom";

export function RedirectButton({ buttonText, route }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return <button onClick={handleClick}>{buttonText}</button>;
}
