import { getCookie, requestToServ, setCookie } from "../api/api";

export const REQUEST_USER = "REQUEST_USER";
export const REQUEST_USER_SUCCESS = "REQUEST_USER_SUCCESS";
export const REQUEST_USER_FAILED = "REQUEST_USER_FAILED";

export const REQUEST_PASSWORD = "REQUEST_PASSWORD";
export const REQUEST_PASSWORD_SUCCESS = "REQUEST_PASSWORD_SUCCESS";
export const REQUEST_PASSWORD_FAILED = "REQUEST_PASSWORD_FAILED";

export const REQUEST_CREATE_USER = "REQUEST_CREATE_USER";
export const REQUEST_CREATE_USER_SUCCESS = "REQUEST_CREATE_USER_SUCCESS";
export const REQUEST_CREATE_USER_FAILED = "REQUEST_CREATE_USER_FAILED";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const REQUEST_LOGIN_SUCCESS = "REQUEST_LOGIN_SUCCESS";
export const REQUEST_LOGIN_FAILED = "REQUEST_LOGIN_FAILED";

export const CHECK_LOGIN = "CHECK_LOGIN";
export const CHECK_LOGIN_SUCCESS = "CHECK_LOGIN_SUCCESS";
export const CHECK_LOGIN_FAILED = "CHECK_LOGIN_FAILED";

export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
// Проверка существет ли юзер при попытке восстановить пароль по емейл
export const requestUser = (data) => {
  return function (dispatch) {
    dispatch({
      type: REQUEST_USER,
    });
    try {
      requestToServ("password-reset", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => {
        if (res) {
          dispatch({
            type: REQUEST_USER_SUCCESS,
            userData: res,
          });
        } else {
          dispatch({
            type: REQUEST_USER_FAILED,
          });
        }
      });
    } catch (err) {
      throw new Error(
        `Ошибка в получении сведений о пользователе ${err.message}`
      );
    }
  };
};

// отправка формы с новым паролем и токеном
export const resetPassword = (data) => {
  return function (dispatch) {
    dispatch({
      type: REQUEST_PASSWORD,
    });
    try {
      requestToServ("password-reset/reset", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => {
        if (res) {
          dispatch({
            type: REQUEST_PASSWORD_SUCCESS,
            passwordMsg: res,
          });
        } else {
          dispatch({
            type: REQUEST_PASSWORD_FAILED,
          });
        }
      });
    } catch (err) {
      throw new Error(`Ошибка в смене пароля ${err.message}`);
    }
  };
};

// отправка формы регистрации
export const createUser = (data) => {
  return function (dispatch) {
    dispatch({
      type: REQUEST_CREATE_USER,
    });
    try {
      requestToServ("auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }).then((res) => {
        if (res) {
          dispatch({
            type: REQUEST_CREATE_USER_SUCCESS,
            user: res,
          });
        } else {
          dispatch({
            type: REQUEST_CREATE_USER_FAILED,
          });
        }
        let authToken = res.accessToken;
        let refreshToken = res.refreshToken;
        if (authToken && refreshToken) {
          setCookie("token", authToken);
          setCookie("refreshToken", refreshToken);
        }
      });
    } catch (err) {
      throw new Error(`Ошибка в создании пользователя ${err.message}`);
    }
  };
};

// отправка логин формы если нет токенов в куки
export const requestLogin = (data) => {
  return function (dispatch) {
    dispatch({
      type: REQUEST_LOGIN,
    });
    try {
      requestToServ("auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }).then((res) => {
        if (res) {
          dispatch({
            type: REQUEST_LOGIN_SUCCESS,
            user: res.user,
          });
        } else {
          dispatch({
            type: REQUEST_LOGIN_FAILED,
          });
        }
        let authToken = res.accessToken;
        let refreshToken = res.refreshToken;
        if (authToken && refreshToken) {
          setCookie("token", authToken);
          setCookie("refreshToken", refreshToken);
        }
      });
    } catch (err) {
      throw new Error(`Ошибка при во входе в учетную запись ${err.message}`);
    }
  };
};

// проверка если есть токены. если есть автоматический логин
export const checkLogin = () => {
  return function (dispatch) {
    dispatch({
      type: CHECK_LOGIN,
    });
    const token = { token: getCookie("refreshToken") };
    try {
      requestToServ("auth/token", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
        redirect: "follow",
        referrerPolicy: "no-referrer",
      })
        .then((res) => {
          if (res.success) {
            let authToken = res.accessToken;
            let refreshToken = res.refreshToken;
            if (authToken && refreshToken) {
              setCookie("token", authToken);
              setCookie("refreshToken", refreshToken);
            }
          } else {
            dispatch({
              type: CHECK_LOGIN_FAILED,
            });
          }
          return res;
        })
        .then((data) => {
          requestToServ("auth/user", {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Authorization: data.accessToken,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
          }).then((res) => {
            if (res.success) {
              dispatch({
                type: CHECK_LOGIN_SUCCESS,
                user: res.user,
              });
            } else {
              dispatch({
                type: CHECK_LOGIN_FAILED,
              });
            }
          });
        });
    } catch (err) {
      throw new Error(`Ошибка при во входе в учетную запись ${err.message}`);
    }
  };
};

// отправка формы с выходом, куки становятся недействительными. чтобы войти нужно снова ввести логин-пароль
export const logout = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT,
    });
    const token = { token: getCookie("refreshToken") };
    try {
      requestToServ("auth/logout", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }).then((res) => {
        if (res.success) {
          dispatch({
            type: LOGOUT_SUCCESS,
            user: null,
          });
        } else {
          dispatch({
            type: CHECK_LOGIN_FAILED,
          });
        }
      });
    } catch (err) {
      throw new Error(`Ошибка при во входе в учетную запись ${err.message}`);
    }
  };
};

// export const requestCurrentUser = () => {
//   return function (dispatch) {
//     dispatch({
//       type: LOGOUT,
//     });
//     try {
//       requestToServ("auth/user", {
//         method: "GET",
//         mode: "cors",
//         cache: "no-cache",
//         credentials: "same-origin",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: getCookie("token"),
//         },
//         redirect: "follow",
//         referrerPolicy: "no-referrer",
//       }).then((res) => {
//         if (res.success) {
//           dispatch({
//             type: CHECK_LOGIN_SUCCESS,
//             user: res.user,
//           });
//         } else {
//           dispatch({
//             type: CHECK_LOGIN_FAILED,
//           });
//         }
//       });
//     } catch (err) {
//       throw new Error(`Ошибка при во входе в учетную запись ${err.message}`);
//     }
//   };
// };
