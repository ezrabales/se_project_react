import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const ClothesSection = ({
  addNewBtn,
  clothingItems,
  images,
  onCardClick,
  onCardLike,
}) => {
  const currentUser = useCurrentUser();
  return (
    <div className="clothes">
      <div className="clothes__header">
        <p className="clothes__text">Your items</p>
        <button onClick={addNewBtn} className="clothes__btn">
          + Add new
        </button>
      </div>
      <div className="clothes__container">
        <ul className="clothes__list">
          {clothingItems &&
            clothingItems.map((item) => {
              if ((item.owner = currentUser._id)) {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={onCardClick}
                    images={images}
                    onCardLike={onCardLike}
                    isLoggedIn={true}
                  />
                );
              }
            })}
        </ul>
      </div>
    </div>
  );
};

export default ClothesSection;
