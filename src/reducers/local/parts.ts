import { AnyAction } from 'redux';
import { DECREMENT_PART, INCREMENT_PART, ADD_PART } from '../../actions/parts';

// import { v4 as uuid } from 'uuid';

const initialState = [
  {
    name: 'Wheel',
    amount: 0,
  },
  {
    name: 'Chasis',
    amount: 0,
  },
  {
    name: 'Engine',
    amount: 0,
  },
  {
    name: 'Windshield',
    amount: 0,
  },
];

const partsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case INCREMENT_PART: {
      const newState = [...state];
      const idx = newState.findIndex(part => part.name === action.partName);
      newState[idx].amount += 1;
      return [...newState];
    }
    case DECREMENT_PART: {
      const newState = [...state];
      const idx = newState.findIndex(part => part.name === action.partName);
      newState[idx].amount -= 1;
      return [...newState];
    }
    case ADD_PART: {
      const newState = [...state];
      newState.push({ name: action.partName, amount: 0 });
      return [...newState];
    }

    default:
      return state;
  }
};

export default partsReducer;
