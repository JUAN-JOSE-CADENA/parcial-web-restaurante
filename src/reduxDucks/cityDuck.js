/**
 * Constants
 */
const initialData = {
  loggedIn: false,
  array: [],
  restaurant: {},
};

const GET_CITY = "GET_CITY";
const GET_CITY_SUCCESS = "GET_CITY_SUCCESS";
const GET_CITY_ERRROR = "GET_CITY_ERRROR";

const GET_RESTAURANTE = "GET_RESTAURANTE";
const GET_RESTAURANTE_SUCCESS = "GET_RESTAURANTE_SUCCESS";
const GET_RESTAURANTE_ERRROR = "GET_RESTAURANTE_ERRROR";

function reducer(state = initialData, action) {
  switch (action.type) {
    case GET_CITY:
      return { ...state, fetching: true };
    case GET_CITY_SUCCESS:
      return { ...state, array: action.payload, fetching: false };
    case GET_CITY_ERRROR:
      return { ...state, fetching: false, error_e: action.payload };
    case GET_RESTAURANTE:
      return { ...state, fetching: true };
    case GET_RESTAURANTE_SUCCESS:
      return { ...state, restaurant: action.payload, fetching: false };
    case GET_RESTAURANTE_ERRROR:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
}

export default reducer;

/**
 * Actions (thunk)
 */
export const getCityAction = (search) => (dispatch) => {
  dispatch({
    type: GET_CITY,
  });
  // return fetch(`https://api.allorigins.win/get?url=${encodeURIComponent("https://apimocha.com/sebastianrest/Ciudades")}`)
  return fetch("https://apimocha.com/sebastianrest/Ciudades")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let arrayRes = [];
      for (let i = 0; i < Object.keys(data).length; i++) {
        if (Object.keys(data)[i].toLowerCase().includes(search.toLowerCase())) {
          arrayRes = arrayRes.concat(Object.values(data)[i]);
          console.log(arrayRes);
        }
      }
      dispatch({ type: GET_CITY_SUCCESS, payload: arrayRes });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_CITY_ERRROR, payload: err });
    });
};

export const getRestauranteAction = (id) => (dispatch) => {
  dispatch({
    type: GET_RESTAURANTE,
  });
  return fetch(`https://apimocha.com/sebastianrest/Ciudades/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      dispatch({
        type: GET_RESTAURANTE_SUCCESS,
        payload: data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_RESTAURANTE_ERRROR,
        payload: err,
      })
    );
};
