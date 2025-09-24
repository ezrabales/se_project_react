import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const currentUser = useCurrentUser();
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    onAddItem({
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
      owner: currentUser._id,
      isLiked: false,
    });
    setValues({ name: "", imageUrl: "", weather: "" });
  }
  return (
    <ModalWithForm
      title="New garment"
      formOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      buttonText="Add garment"
    >
      <label className="form__text-label">
        Name
        <input
          id="garment__name_input"
          name="name"
          type="text"
          className="form__text-input"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label className="form__text-label">
        Image URL
        <input
          id="garment__image_input"
          name="imageUrl"
          type="url"
          className="form__text-input"
          placeholder="Image"
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <div className="form__weather-options">
        Select the weather type:
        <label className="form__radio-label">
          <input
            id="weather-option_hot"
            name="weather"
            type="radio"
            value="hot"
            className="form__radio-input"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />
          Hot
        </label>
        <label className="form__radio-label">
          <input
            id="weather-option_warm"
            name="weather"
            type="radio"
            value="warm"
            className="form__radio-input"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />
          Warm
        </label>
        <label className="form__radio-label">
          <input
            id="weather-option_cold"
            name="weather"
            type="radio"
            value="cold"
            className="form__radio-input"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
};
export default AddItemModal;
