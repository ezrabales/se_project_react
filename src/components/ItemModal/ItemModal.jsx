import "./ItemModal.css";
import React from "react";

function ItemModal({ item, onClose, itemModalOpen }) {
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
    if (itemModalOpen) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("click", handleClickOut);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("click", handleClickOut);
    };
  }, [itemModalOpen]);
  if (itemModalOpen) {
    return (
      <div className={`modal ${itemModalOpen ? "modal-is-open" : ""}`}>
        <div className="modal__container">
          <button className="modal__close" onClick={onClose} />
          <img src={item.link} alt={item.name} className="modal__img" />
          <div className="modal__footer">
            <p className="modal__description">{item.name}</p>
            <p className="modal__weather-requirement">
              Weather: {item.weather}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemModal;
