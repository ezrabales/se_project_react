import "./EditProfileModal.css";
import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";

const EditProfileModal = ({ isOpen, onEditProfile, onCloseModal }) => {
  const { values, handleChange } = useForm({
    name: "",
    avatarImage: "",
  });
  const currentUser = useCurrentUser();
  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile({ name: values.name, avatar: values.avatarImage });
  }
  return (
    <ModalWithForm
      title="Change profile data"
      formOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <label className="form__text-label">
        Name *
        <input
          id="profile__name_input"
          name="name"
          type="text"
          className="form__text-input"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label className="form__text-label">
        Avatar *
        <input
          id="profile__avatar_input"
          name="avatarImage"
          type="url"
          className="form__text-input"
          placeholder="Image"
          onChange={handleChange}
          value={values.avatarImage}
        />
      </label>
    </ModalWithForm>
  );
};
export default EditProfileModal;
