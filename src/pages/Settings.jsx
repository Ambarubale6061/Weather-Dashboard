import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUnit } from '../store/weatherSlice';

export default function Settings(){
  const dispatch = useDispatch();
  const unit = useSelector(s => s.weather.unit);
  return (
    <div className="settings">
      <h2>Settings</h2>
      <div className="setting-row">
        <label>Temperature Unit</label>
        <button onClick={() => dispatch(toggleUnit())}>{unit}</button>
      </div>
    </div>
  );
}
