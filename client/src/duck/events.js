import { LOADING, SELECT_EVENT, SELECT_CATEGORY } from './types';

const initialState = {
  imBusy: {
    categories: true,
    events: true,
  },
  categories: [],
  selectedCategory: {},
  selectedCategoryEvents: [],
  events: [],
  selectedEvent: {},
  teams: [],
};

export default (state = initialState, action) => {
  const { payload = {}, type } = action;

  switch (type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        ...payload,
        imBusy: {
          ...state.imBusy,
          categories: false,
        },
      };

    case SELECT_EVENT:
      return {
        ...state,
        ...payload,
        imBusy: {
          ...state.imBusy,
          events: false,
        },
      };

    case LOADING:
      return { ...state, imBusy: true };

    default:
      return state;
  }
};

export const selectCategory = ({
  categories, selectedCategory, selectedCategoryEvents,
}) => {
  return (
    {
      type: SELECT_CATEGORY,
      payload: {
        categories,
        selectedCategory,
        selectedCategoryEvents,
      },
    }
  );
};

export const selectEvent = (payload) => {
  return (
    {
      type: SELECT_EVENT,
      payload,
    }
  );
};

export const loading = () => (
  {
    type: LOADING,
    payload: {},
  }
);
