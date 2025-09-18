import "./SideBar.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useState, useEffect } from "react";

const SideBar = ({ images, onEditProfileClick, onLogOutClick }) => {
  const currentUser = useCurrentUser();
  const name = currentUser.name;
  const avatar = currentUser.avatar;
  return (
    <div className="sidebar">
      <div className="sidebar__element-container">
        {currentUser && avatar ? (
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
            <h2 className="header__inner-circle">{name[0].toUpperCase()}</h2>
          </div>
        )}
        <p className="sidebar__name">{name}</p>
      </div>
      <button className="sidebar__edit-profile" onClick={onEditProfileClick}>
        Change profile data
      </button>
      <button className="sidebar__log-out" onClick={onLogOutClick}>
        Log out
      </button>
    </div>
  );
};
export default SideBar;
