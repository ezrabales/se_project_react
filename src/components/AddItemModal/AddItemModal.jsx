import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [weather, setWeather] = React.useState("");
  const owner = "Ezra Bales";
  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather, owner, isLiked: false });
  }
  return (
    <ModalWithForm
      title="New garment"
      formOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      buttonText="Add garment"
    >
      <label htmlFor="garment__name_input" className="form__text-label">
        Name
        <input
          id="garment__name_input"
          type="text"
          className="form__text-input"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="garment__image_input" className="form__text-label">
        Image URL
        <input
          id="garment__image_input"
          type="url"
          className="form__text-input"
          placeholder="Image"
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <div className="form__weather-options">
        Select the weather type:
        <label htmlFor="weather-option_hot" className="form__radio-label">
          <input
            id="weather-option_hot"
            name="weather"
            type="radio"
            value="hot"
            className="form__radio-input"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
          Hot
        </label>
        <label htmlFor="weather-option_warm" className="form__radio-label">
          <input
            id="weather-option_warm"
            name="weather"
            type="radio"
            value="warm"
            className="form__radio-input"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          Warm
        </label>
        <label htmlFor="weather-option_cold" className="form__radio-label">
          <input
            id="weather-option_cold"
            name="weather"
            type="radio"
            value="cold"
            className="form__radio-input"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
};
export default AddItemModal;
