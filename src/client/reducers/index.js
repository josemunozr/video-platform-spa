const reducer = (state, action) => {
  const getResultSearch = (state, payload) => {
    let result = [];
    if (action.payload) {
      result = state.trends.filter((item) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      result = result.concat(
        state.originals.filter((item) =>
          item.title.toLowerCase().includes(action.payload.toLowerCase())
        )
      );
    }
    return result;
  };
  switch (action.type) {
    case 'SET_FAVORITE':
      return {
        ...state,
        myList: [...state.myList, action.payload],
      };
    case 'DELETE_FAVORITE':
      return {
        ...state,
        myList: state.myList.filter((item) => item._id !== action.payload),
      };
    case 'LOGIN_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'REGISTER_REQUEST':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_VIDEO_SOURCE':
      return {
        ...state,
        playing:
          state.trends.find((item) => item.id === Number(action.payload)) ||
          state.originals.find((item) => item.id === Number(action.payload)) ||
          {},
      };
    case 'GET_RESULT_SEARCH':
      return {
        ...state,
        searchResult: getResultSearch(state, action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
