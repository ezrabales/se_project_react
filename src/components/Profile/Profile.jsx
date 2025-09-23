import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

function Profile({
  addNewBtn,
  images,
  clothingItems,
  onCardClick,
  onCardLike,
  onEditProfileClick,
  onLogOutClick,
}) {
  return (
    <div className="profile">
      <SideBar
        images={images}
        onEditProfileClick={onEditProfileClick}
        onLogOutClick={onLogOutClick}
      />
      <ClothesSection
        addNewBtn={addNewBtn}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
        images={images}
        onCardClick={onCardClick}
      />
    </div>
  );
}
export default Profile;
