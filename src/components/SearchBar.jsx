import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeatherForCity } from '../store/weatherSlice';

export default function SearchBar({ onAdd }){
  const [q, setQ] = useState('');
  const dispatch = useDispatch();
  const doSearch = async (e) => {
    e.preventDefault();
    if (!q) return;
    try {
      await dispatch(fetchWeatherForCity(q)).unwrap();
      onAdd(q);
      setQ('');
    } catch(err){
      alert('City not found in sample dataset or API.');
    }
  };
  return (
    <form className="searchbar" onSubmit={doSearch}>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search city (sample dataset)" />
      <button type="submit">Search</button>
    </form>
  );
}
