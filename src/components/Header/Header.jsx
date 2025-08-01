import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header({ weatherData, onClick, images }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__left">
        <NavLink to="/se_project_react/">
          <img
            src={images["/src/assets/wtwr.svg"]}
            alt="wtwr Logo"
            className="header__logo"
          />
        </NavLink>

        <p className="header__dateLocation">
          {currentDate}, {weatherData?.location}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        <button onClick={onClick} className="header__addClothesBtn">
          + Add clothes
        </button>
        <NavLink
          to="/se_project_react/profile/"
          className="header__profile-info"
        >
          <p className="header__userName">Ezra Bales</p>
          <img
            src={images["/src/assets/avatar.svg"]}
            alt="user avatar"
            className="header__userAvatar"
          />
        </NavLink>
      </div>
    </header>
  );
}
export default Header;
