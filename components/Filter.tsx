import React, { useState } from 'react';
import { useContactContext } from '../context/ContactContext';

const Filter = () => {
  const [textFilter, setTextFilter] = useState('');
  const { handleFilter } = useContactContext();

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTextFilter(e.target.value);
    if (e.target.value.length >= 3) {
      handleFilter(e.target.value);
    }
    if (e.target.value.length < 3) {
      // handleFilter('');
    }
  };

  return (
    <div>
      Filter
      <input value={textFilter} onChange={handleInput}></input>
    </div>
  );
};

export default Filter;
