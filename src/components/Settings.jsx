import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTemperatureUnit,
  setRefreshInterval,
} from "../redux/slices/settingsSlice";
import "../styles/Settings.css";

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);
  const [isOpen, setIsOpen] = useState(false);

  const handleUnitChange = (unit) => {
    dispatch(setTemperatureUnit(unit));
  };

  const handleIntervalChange = (interval) => {
    dispatch(setRefreshInterval(interval));
  };

  return (
    <div className="settings-container">
      <button className="settings-toggle" onClick={() => setIsOpen(!isOpen)}>
        ⚙️ Settings
      </button>

      {isOpen && (
        <div className="settings-modal">
          <div className="settings-content">
            <div className="settings-header">
              <h3>Settings</h3>
              <button className="close-btn" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            <div className="settings-group">
              <h4>Temperature Unit</h4>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    value="celsius"
                    checked={settings.unit === "celsius"}
                    onChange={() => handleUnitChange("celsius")}
                  />
                  <span>°C Celsius</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    value="fahrenheit"
                    checked={settings.unit === "fahrenheit"}
                    onChange={() => handleUnitChange("fahrenheit")}
                  />
                  <span>°F Fahrenheit</span>
                </label>
              </div>
            </div>

            <div className="settings-group">
              <h4>Auto Refresh</h4>
              <select
                value={settings.refreshInterval}
                onChange={(e) => handleIntervalChange(Number(e.target.value))}
                className="interval-select"
              >
                <option value={60}>Every minute</option>
                <option value={300}>Every 5 minutes</option>
                <option value={600}>Every 10 minutes</option>
                <option value={1800}>Every 30 minutes</option>
                <option value={0}>Never</option>
              </select>
            </div>

            <div className="settings-info">
              <p>Real-time updates require authentication</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
