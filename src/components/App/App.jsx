import "./App.css";
import React from "react";
import Header from "../Header/Header";
import Main from "../main/main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import "../../vendor/fonts.css";
import defaultClothingItems from "../../utils/defaultClothingItems";
import { weatherApi } from "../../utils/weatherApi";

const api = new weatherApi();
function App() {
  const [weatherData, setWeatherData] = React.useState();
  React.useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await api.weatherData();
        setWeatherData(data);
      } catch (err) {
        console.log("error occured:", err);
      }
    };
    fetchWeatherData();
  }, []);
  const [clothingItems, setClothingItems] =
    React.useState(defaultClothingItems);
  const [itemModalOpen, setitemModalOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const handleCardClick = (card) => {
    setSelectedCard(clothingItems[card.target.id]);
    setitemModalOpen(true);
  };
  const closeItemModal = () => {
    setitemModalOpen(false);
  };
  const [formOpen, setFormOpen] = React.useState(false);
  const [modalWithFormTitle, setModalWithFormTitle] = React.useState();
  const [modalWithFormChildren, setModalWithFormChildren] = React.useState();
  const [modalWithFormButtonText, setModalWithFormButtonText] =
    React.useState();
  const handleClothesBtn = () => {
    setModalWithFormTitle("New garment");
    setModalWithFormButtonText("Add garment");
    setModalWithFormChildren(
      <>
        <label htmlFor="garment__name_input" className="form__text-label">
          Name
          <input
            id="garment__name_input"
            type="text"
            className="form__text-input"
            placeholder="Name"
          />
        </label>
        <label htmlFor="garment__image_input" className="form__text-label">
          Image URL
          <input
            id="garment__image_input"
            type="url"
            className="form__text-input"
            placeholder="Image"
          />
        </label>
        <div className="form__weather-options">
          Select the weather type:
          <label htmlFor="weather-option_hot" className="form__radio-label">
            <input
              id="weather-option_hot"
              name="weather"
              type="radio"
              className="form__radio-input"
            />
            Hot
          </label>
          <label htmlFor="weather-option_warm" className="form__radio-label">
            <input
              id="weather-option_warm"
              name="weather"
              type="radio"
              className="form__radio-input"
            />
            Warm
          </label>
          <label htmlFor="weather-option_cold" className="form__radio-label">
            <input
              id="weather-option_cold"
              name="weather"
              type="radio"
              className="form__radio-input"
            />
            Cold
          </label>
        </div>
      </>
    );
    setFormOpen(true);
  };
  const closeForm = () => {
    setModalWithFormTitle();
    setModalWithFormChildren();
    setModalWithFormButtonText();
    setFormOpen(false);
  };
  return (
    <div className="app">
      <Header weatherData={weatherData} onClick={handleClothesBtn} />

      <Main
        weatherData={weatherData}
        filteredItems={clothingItems}
        onCardClick={handleCardClick}
      />
      <ModalWithForm
        formOpen={formOpen}
        onClose={closeForm}
        title={modalWithFormTitle}
        buttonText={modalWithFormButtonText}
        children={modalWithFormChildren}
      />
      <ItemModal
        item={selectedCard}
        onClose={() => {
          setSelectedCard({});
          closeItemModal();
        }}
        itemModalOpen={itemModalOpen}
      />
      <Footer />
    </div>
  );
}
export default App;
