import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useEffect, useState } from "react";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, images, isLoggedIn }) {
  const currentUser = useCurrentUser();
  const [userId, setUserId] = useState();
  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser._id);
    }
  }, [currentUser]);
  const handleLike = () => {
    onCardLike(item);
  };

  return (
    <li className="card">
      <div className="card__title">
        <h2 className="card__title_name">{item.name}</h2>
        {isLoggedIn ? (
          <img
            onClick={handleLike}
            src={
              item.likes.includes(userId)
                ? images[`/src/assets/likeButtonLiked.svg`]
                : images[`/src/assets/likeButton.svg`]
            }
            alt={item.isLiked ? "like button liked" : "like button not-liked"}
            className="card__title_like"
          />
        ) : (
          ""
        )}
      </div>

      <img
        onClick={onCardClick}
        id={item._id}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
