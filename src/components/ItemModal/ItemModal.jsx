import "./ItemModal.css";
import React from "react";
import useModalClose from "../../hooks/useModalClose";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function ItemModal({ item, onClose, isItemModalOpen, onDelete }) {
  const currentUser = useCurrentUser();
  useModalClose(isItemModalOpen, onClose);
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
            {currentUser._id === item.owner && (
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
