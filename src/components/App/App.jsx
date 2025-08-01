import "./App.css";
import React from "react";
import Header from "../Header/Header";
import Main from "../main/main";
import Footer from "../Footer/Footer";
import { Api } from "../../utils/Api";
import ItemModal from "../ItemModal/ItemModal";
import "../../vendor/fonts.css";
import { WeatherApi } from "../../utils/WeatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import { Routes, Route } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal";

const images = import.meta.glob("/src/assets/*.svg", {
  eager: true,
  as: "url",
});
const clothesApi = new Api();
const weatherInfoApi = new WeatherApi();
function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    React.useState("F");
  const [weatherData, setWeatherData] = React.useState();
  React.useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await weatherInfoApi.weatherData();
        setWeatherData(data);
      } catch (err) {
        console.log("error occured:", err);
      }
    };
    fetchWeatherData();
  }, []);
  const [clothingItems, setClothingItems] = React.useState();
  React.useEffect(() => {
    const fetchClothingData = async () => {
      try {
        const data = await clothesApi.getItems();
        setClothingItems(data);
      } catch (err) {
        console.log("error occured:", err);
      }
    };
    fetchClothingData();
  }, []);
  const [itemModalOpen, setItemModalOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const handleCardClick = (card) => {
    setSelectedCard(
      clothingItems.find((item) => {
        return item._id == card.target.id;
      })
    );
    setItemModalOpen(true);
  };
  const closeItemModal = () => {
    setItemModalOpen(false);
  };
  const [formOpen, setFormOpen] = React.useState(false);
  const [modalWithFormTitle, setModalWithFormTitle] = React.useState();
  const [modalWithFormChildren, setModalWithFormChildren] = React.useState();
  const [modalWithFormButtonText, setModalWithFormButtonText] =
    React.useState();
  const handleClothesBtn = () => {
    setModalWithFormTitle("New garment");
    setModalWithFormButtonText("Add garment");
    setFormOpen(true);
  };
  const closeForm = () => {
    setModalWithFormTitle();
    setModalWithFormButtonText();
    setFormOpen(false);
  };
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  const handleAddItemSubmit = (item) => {
    clothesApi.addItem(item).then((res) => {
      closeForm();
      item._id = res._id;
      setClothingItems([item, ...clothingItems]);
    });
  };
  const handleDeleteItem = (item) => {
    clothesApi.deleteItem(item.target.id).then((res) => {
      const newClothingItems = clothingItems.filter((clothingItem) => {
        return clothingItem._id != item.target.id;
      });
      setClothingItems(newClothingItems);
      closeItemModal();
    });
  };
  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          weatherData={weatherData}
          onClick={handleClothesBtn}
          images={images}
        />
        <Routes>
          <Route
            path="/"
            element={
              clothingItems && (
                <Main
                  weatherData={weatherData}
                  filteredItems={clothingItems}
                  onCardClick={handleCardClick}
                  images={images}
                />
              )
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                addNewBtn={handleClothesBtn}
                images={images}
                clothingItems={clothingItems}
                onCardClick={handleCardClick}
              />
            }
          ></Route>
        </Routes>
        <AddItemModal
          isOpen={formOpen}
          onAddItem={handleAddItemSubmit}
          onCloseModal={closeForm}
        />
        <ItemModal
          item={selectedCard}
          onClose={() => {
            setSelectedCard({});
            closeItemModal();
          }}
          itemModalOpen={itemModalOpen}
          onDelete={handleDeleteItem}
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;
