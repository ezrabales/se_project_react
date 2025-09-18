import "./EditProfileModal.css";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onEditProfile, onCloseModal }) => {
  const currentUser = useCurrentUser();
  const [name, setName] = React.useState("");
  const [avatarImage, setAvatarImage] = React.useState("");
  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setAvatarImage(currentUser.avatar);
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarImageChange = (e) => {
    setAvatarImage(e.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile({ name, avatar: avatarImage });
  }
  return (
    <ModalWithForm
      title="Change profile data"
      formOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <label htmlFor="profile__name_input" className="form__text-label">
        Name *
        <input
          id="profile__name_input"
          type="text"
          className="form__text-input"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="profile__avatar_input" className="form__text-label">
        Avatar *
        <input
          id="profile__avatar_input"
          type="url"
          className="form__text-input"
          placeholder="Image"
          onChange={handleAvatarImageChange}
          value={avatarImage}
        />
      </label>
    </ModalWithForm>
  );
};
export default EditProfileModal;
