import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PartDescriptor from '../components/PartDescriptor';
import { decrementPart, incrementPart, addPart } from '../actions/parts';
import { partsSelector } from '../selectors/local';

import './Home.sass';
import theme from '../theme';

const Home = () => {
  const [selectedPart, setSelectedPart] = useState<string>(null);
  const parts = useSelector(partsSelector);
  const dispatch = useDispatch();
  const [newPartName, setNewPartName] = useState('');

  return (
    <div>
      <h1>Parts Counter</h1>
      <hr />
      <ul
        className="partsList"
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        {parts.map(part => (
          <li
            key={part.name}
            onClick={() => setSelectedPart(part.name)}
            style={{
              cursor: 'pointer',
              borderRadius: 4,
              backgroundColor:
                selectedPart == part.name ? theme.highlightColor : '#EEEEEE',
              padding: 4,
              display: 'flex',
              gap: 4,
            }}
          >
            <span style={{ fontWeight: selectedPart == part.name ? 800 : 500 }}>
              {part.name}
            </span>
            {part.amount}
            <button
              onClick={e => {
                dispatch(incrementPart(part.name));
                setSelectedPart(part.name);
              }}
            >
              +
            </button>
            <button
              onClick={e => {
                dispatch(decrementPart(part.name));
                setSelectedPart(part.name);
              }}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <form>
        <h6>Add a new part</h6>
        <input
          value={newPartName}
          onChange={e => setNewPartName(e.target.value)}
        />
        <button
          onClick={e => {
            e.preventDefault();
            dispatch(addPart(newPartName));
            setNewPartName('');
          }}
        >
          Add Part
        </button>
      </form>
      <hr />
      <h2>Part Info</h2>
      {selectedPart &&
        (() => {
          const part = parts.find(x => x.name === selectedPart);
          return <PartDescriptor name={part.name} amount={part.amount} />;
        })()}
    </div>
  );
};

export default Home;
