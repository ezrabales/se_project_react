import "./ItemModal.css";
import React from "react";

function ItemModal({ item, onClose, isItemModalOpen, onDelete }) {
  const isOwn = false;
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    const handleClickOut = (e) => {
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };
    if (isItemModalOpen) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("click", handleClickOut);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleClickOut);
    };
  }, [isItemModalOpen]);
  if (isItemModalOpen) {
    return (
      <div className={`modal ${isItemModalOpen ? "modal-is-open" : ""}`}>
        <div className="modal__container">
          <button className="modal__close" onClick={onClose} />
          <img src={item.imageUrl} alt={item.name} className="modal__img" />
          <div className="modal__footer">
            <p className="modal__description">{item.name}</p>
            <p className="modal__weather-requirement">
              Weather: {item.weather}
            </p>
            {isOwn && (
              <button
                id={item._id}
                onClick={onDelete}
                className="modal__delete-btn"
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ItemModal;
