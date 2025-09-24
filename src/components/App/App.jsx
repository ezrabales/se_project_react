// use json-server --watch db.json --id _id --port 3001 to start server
// next step: Task 3. Add the editing profile logic

// css imports
import "./App.css";
import "../../vendor/fonts.css";
// external library imports
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// component imports
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import ProtectedRoute from "../ProtectedRoute";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
// api/utils imports
import { Api } from "../../utils/Api";
import { WeatherApi } from "../../utils/WeatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  register,
  authorize,
  checkToken,
  update,
  like,
  unlike,
} from "../../utils/auth";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

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
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const [currentUser, setCurrentUser] = useState();
  const [loggingIn, setLoggingIn] = useState(false);
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
        setClothingItems(data.data);
      } catch (err) {
        console.error("error occured:", err);
      }
    };
    fetchClothingData();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("jwt"));

    if (!token) {
      return;
    }
    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch(console.error);
    setIsLoggedIn(true);
    setLoggingIn(false);
  }, [loggingIn]);

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
  const editProfileClose = () => {
    setEditProfileOpen(false);
  };
  const handleRegister = ({ email, password, name, avatar }) => {
    register({ name, password, email, avatar })
      .then(() => {
        setRegisterOpen(false);
        authorize({ email, password }).then((res) => {
          if (res.token) {
            localStorage.setItem("jwt", res.token);
          }
        });
        setLoggingIn(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const registerClose = () => {
    setRegisterOpen(false);
  };
  const handleLogin = ({ email, password }) => {
    authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        }
        setLoggingIn(true);
        setLoginOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const loginClose = () => {
    setLoginOpen(false);
  };
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };
  const handleAddItemSubmit = async (item) => {
    setToken(localStorage.getItem("jwt"));
    clothesApi
      .addItem(item, token)
      .then((res) => {
        closeForm();
        setClothingItems([res.data, ...clothingItems]);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(undefined);
    setIsLoggedIn(false);
  };
  const handleEditProfile = ({ name, avatar }) => {
    update({ name, avatar, token })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setEditProfileOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleDeleteItem = (item) => {
    setToken(localStorage.getItem("jwt"));
    clothesApi
      .deleteItem(item.target.id, token)
      .then(() => {
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
  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");
    !likes.includes(currentUser._id)
      ? like({ _id, token })
          .then((updatedItem) => {
            setClothingItems(
              clothingItems.map((item) => {
                return item._id === _id ? updatedItem.data : item;
              })
            );
          })
          .catch((err) => console.error(err))
      : unlike({ _id, token })
          .then((updatedItem) => {
            setClothingItems(
              clothingItems.map((item) => {
                return item._id === _id ? updatedItem.data : item;
              })
            );
          })
          .catch(console.error);
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <Header
            weatherData={weatherData}
            onClick={handleClothesBtn}
            images={images}
            isLoggedIn={isLoggedIn}
            onSignUpClick={setRegisterOpen}
            onSignInClick={setLoginOpen}
            name={currentUser?.name}
            avatar={currentUser?.avatar}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  filteredItems={clothingItems || ""}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  images={images}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                  <Profile
                    addNewBtn={handleClothesBtn}
                    images={images}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onEditProfileClick={setEditProfileOpen}
                    onLogOutClick={handleLogOut}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <RegisterModal
            isOpen={registerOpen}
            onRegister={handleRegister}
            onCloseModal={registerClose}
            setLoginOpen={setLoginOpen}
          />
          <LoginModal
            isOpen={loginOpen}
            onCloseModal={loginClose}
            onLogin={handleLogin}
            setRegisterOpen={setRegisterOpen}
          />
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
          <EditProfileModal
            isOpen={editProfileOpen}
            onCloseModal={editProfileClose}
            onEditProfile={handleEditProfile}
          />
          <Footer />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
