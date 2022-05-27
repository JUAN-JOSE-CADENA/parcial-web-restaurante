import { login, register, signOut } from "../firebase";

/**
 * Constants
 */
const initialData = {
  loggedIn: false,
  fetching: false,
  error: false,
};
const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";

const REGISTER = "REGISTER";

const LOG_OUT = "LOG_OUT";

const reducer = (state = initialData, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case REGISTER:
      return { ...state, fetching: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        fetching: false,
        ...action.payload,
        loggedIn: true,
        error: false,
      };
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload };
    case LOG_OUT:
      return { ...initialData, loggedIn: false, fetching: false };
    default:
      return state;
  }
};

export default reducer;

/**
 * Action (Action creators)
 */

export const logOutAction = () => (dispatch) => {
  signOut();
  dispatch({
    type: LOG_OUT,
  });
  localStorage.removeItem("storage");
};

export const restoreSessionAction = () => (dispatch, getState) => {
  let storage = localStorage.getItem("storage");
  storage = JSON.parse(storage);
  if (storage && storage.user.loggedIn) {
    // console.log(storage.user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: storage.user,
    });
  }
};

export const doLoginAction = (email, password) => (dispatch, getState) => {
  dispatch({
    type: LOGIN,
  });
  console.log(email)

  return login(email, password)
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          email: user.email,
        },
      });
      saveStorage(getState());
    })
    .catch((e) => {
      //   console.log(e);
      dispatch({
        type: LOGIN_ERROR,
        payload: e.message,
      });
    });
};

export const doRegisterAction =
  (email, password, passwordConfirm) => (dispatch, getState) => {
    dispatch({
      type: REGISTER,
    });
    if (password === passwordConfirm) {
      return register(email, password)
        .then((user) => {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: {
              uid: user.uid,
              email: user.email,
            },
          });
          saveStorage(getState());
        })
        .catch((e) => {
          //   console.log(e);
          dispatch({
            type: LOGIN_ERROR,
            payload: e.message,
          });
        });
    } else {
      dispatch({
        type: LOGIN_ERROR,
        payload: "passConfirm",
      });
    }
  };

/**
 * Aux Functions
 */

const saveStorage = (storage) => {
  localStorage.storage = JSON.stringify(storage);
};
