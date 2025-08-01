import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({ addNewBtn, images, clothingItems, onCardClick }) {
  return (
    <div className="profile">
      <SideBar images={images} />
      <ClothesSection
        addNewBtn={addNewBtn}
        clothingItems={clothingItems}
        onCardClick={onCardClick}
      />
    </div>
  );
}
export default Profile;
