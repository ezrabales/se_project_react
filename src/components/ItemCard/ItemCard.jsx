import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card">
      <h2 className="card__title">{item.name}</h2>
      <img
        onClick={onCardClick}
        id={item._id}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}
export default ItemCard;
