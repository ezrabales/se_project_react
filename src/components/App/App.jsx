// css imports
import "./App.css";
import "../../vendor/fonts.css";
// external library imports
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// component imports
import Header from "../Header/Header";
import Main from "../main/main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
// api/utils imports
import { Api } from "../../utils/Api";
import { WeatherApi } from "../../utils/WeatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const images = import.meta.glob("/src/assets/*.svg", {
  eager: true,
  as: "url",
});
const clothesApi = new Api();
const weatherInfoApi = new WeatherApi();
function App() {
  // state declaration station
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [weatherData, setWeatherData] = useState();
  const [clothingItems, setClothingItems] = useState();
  const [isItemModalOpen, setisItemModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [formOpen, setFormOpen] = useState(false);
  const [modalWithFormTitle, setModalWithFormTitle] = useState();
  const [modalWithFormChildren, setModalWithFormChildren] = useState();
  const [modalWithFormButtonText, setModalWithFormButtonText] = useState();
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await weatherInfoApi.weatherData();
        setWeatherData(data);
      } catch (err) {
        console.error("error occured:", err);
      }
    };
    fetchWeatherData();
  }, []);

  useEffect(() => {
    const fetchClothingData = async () => {
      try {
        const data = await clothesApi.getItems();
        setClothingItems(data);
      } catch (err) {
        console.error("error occured:", err);
      }
    };
    fetchClothingData();
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(
      clothingItems.find((item) => {
        return item._id == card.target.id;
      })
    );
    setisItemModalOpen(true);
  };
  const closeItemModal = () => {
    setisItemModalOpen(false);
  };

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
  const handleAddItemSubmit = async (item) => {
    clothesApi
      .addItem(item)
      .then((res) => {
        closeForm();
        setClothingItems([res, ...clothingItems]);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleDeleteItem = (item) => {
    clothesApi
      .deleteItem(item.target.id)
      .then((res) => {
        const newClothingItems = clothingItems.filter((clothingItem) => {
          return clothingItem._id != item.target.id;
        });
        setClothingItems(newClothingItems);
        closeItemModal();
      })
      .catch((err) => {
        console.error(err);
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
          isItemModalOpen={isItemModalOpen}
          onDelete={handleDeleteItem}
        />
        <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;
