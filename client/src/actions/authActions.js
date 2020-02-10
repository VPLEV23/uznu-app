import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
// Рєстрація користувача
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login")) // re-direct на сторінку логіна
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Вхі- отримуємо ключ користувача
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Зберігаємо до localStorage
      // Встановлюємо ключ до localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Встановлюємо ключ до Auth header
      setAuthToken(token);
      // розшифровуємо ключ для отримання данних кристувача
      const decoded = jwt_decode(token);
      // Встановлюємо користувача
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// встановлюємо користувача який увійшов
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// Загрузка користувача
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Користувач вийшов
export const logoutUser = () => dispatch => {
  // Видаляэмо ключ з локального сховища
  localStorage.removeItem("jwtToken");
  // видляэмо auth header для наступних запитів
  setAuthToken(false);
  // Встановлюємо поточному користувачу пустий обєкт
  dispatch(setCurrentUser({}));
};
