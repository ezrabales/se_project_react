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

function App() {
  const api = new weatherApi();
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
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const handleCardClick = (card) => {
    setSelectedCard(clothingItems[card.target.id]);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const [formOpen, setFormOpen] = React.useState(false);
  const handleClothesBtn = () => {
    setFormOpen(true);
  };
  const closeForm = () => {
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
      <ModalWithForm formOpen={formOpen} onClose={closeForm} />
      <ItemModal
        item={selectedCard}
        onClose={() => {
          setSelectedCard({});
          closeModal();
        }}
        modalOpen={modalOpen}
      />
      <Footer />
    </div>
  );
}
export default App;
