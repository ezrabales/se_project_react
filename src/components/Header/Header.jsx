import "./Header.css";

function Header({ weatherData, onClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img
          src="../../src/assets/wtwr.svg"
          alt="wtwr Logo"
          className="header__logo"
        />
        <p className="header__dateLocation">
          {currentDate}, {weatherData?.location}
        </p>
      </div>
      <div className="header__right">
        <button onClick={onClick} className="header__addClothesBtn">
          + Add clothes
        </button>
        <p className="header__userName">Ezra Bales</p>
        <img
          src="../../src/assets/avatar.svg"
          alt="user avatar"
          className="header__userAvatar"
        />
      </div>
    </header>
  );
}
export default Header;
