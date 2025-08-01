import React from "react";
import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    handleToggleSwitchChange();
    setChecked(!checked);
  };

  return (
    <div>
      <Checkbox label="C" value={checked} onChange={handleChange} />
    </div>
  );
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <div className="check">
      <label className="check__label">
        <input
          type="checkbox"
          className="check__input"
          checked={value}
          onChange={onChange}
        />
        <span className={`check__button`} />
        <div className="check__text-container">
          <p className="check__text">F</p>
          <p className="check__text">C</p>
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;
