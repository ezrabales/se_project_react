import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ addNewBtn, clothingItems, onCardClick }) => {
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
              if ((item.owner = "Ezra Bales")) {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={onCardClick}
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
