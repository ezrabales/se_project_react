import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  onClick,
  images,
  isLoggedIn,
  onSignUpClick,
  onSignInClick,
  name,
  avatar,
}) {
  const currentUser = useCurrentUser();
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return isLoggedIn ? (
    <header className="header">
      <div className="header__left">
        <NavLink to="/">
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
        <NavLink to="/profile" className="header__profile-info">
          <p className="header__userName">{name}</p>
          {avatar && name ? (
            <div className="header__avatar-container">
              <img
                src={images["/src/assets/no-avatar-circle.svg"]}
                alt="user avatar"
                className="header__userAvatar"
              />
              <img
                src={avatar}
                alt="avatar"
                className="header__inner-circle_avatar"
              />
            </div>
          ) : (
            <div className="header__avatar-container">
              <img
                src={images["/src/assets/no-avatar-circle.svg"]}
                alt="no avatar circle"
                className="header__userAvatar"
              />
              <h2 className="header__inner-circle">
                {name?.[0]?.toUpperCase()}
              </h2>
            </div>
          )}
        </NavLink>
      </div>
    </header>
  ) : (
    <header className="header">
      <div className="header__left">
        <NavLink to="/">
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
        <button className="header__sign-up" onClick={onSignUpClick}>
          Sign Up
        </button>
        <button className="header__sign-in" onClick={onSignInClick}>
          Sign In
        </button>
      </div>
    </header>
  );
}
export default Header;
