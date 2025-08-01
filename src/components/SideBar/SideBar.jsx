import "./SideBar.css";

const SideBar = ({ images }) => {
  return (
    <div className="sidebar">
      <img
        src={images["/src/assets/avatar.svg"]}
        alt="user avatar"
        className="sidebar__avatar"
      />
      <p className="sidebar__name">Ezra Bales</p>
    </div>
  );
};
export default SideBar;
