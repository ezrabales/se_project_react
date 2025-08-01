import "./Profile.css";
import ItemCard from "../ItemCard/ItemCard";

function Profile({ addNewBtn, images, clothingItems, onCardClick }) {
  return (
    <div className="profile">
      <div className="profile__sidebar">
        <img
          src={images["/src/assets/avatar.svg"]}
          alt="user avatar"
          className="profile__user-avatar"
        />
        <p className="profile__user-name">Ezra Bales</p>
      </div>
      <div className="profile__clothes-section">
        <div className="profile__clothes-header">
          <p className="profile__clothes_text">Your items</p>
          <button onClick={addNewBtn} className="profile__clothes_btn">
            + Add new
          </button>
        </div>
        <div className="profile__clothes_container">
          <ul className="profile__clothes_list">
            {clothingItems &&
              clothingItems.map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={onCardClick}
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Profile;
