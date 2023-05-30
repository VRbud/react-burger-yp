import {
  DeleteCookie,
  TUser,
  getCookie,
  requestToServ,
  setCookie,
} from "../api/api";

import { AppDispatch, AppThunk } from "../types";

export const REQUEST_USER: "REQUEST_USER" = "REQUEST_USER";
export const REQUEST_USER_SUCCESS: "REQUEST_USER_SUCCESS" =
  "REQUEST_USER_SUCCESS";
export const REQUEST_USER_FAILED: "REQUEST_USER_FAILED" = "REQUEST_USER_FAILED";

export const REQUEST_PASSWORD: "REQUEST_PASSWORD" = "REQUEST_PASSWORD";
export const REQUEST_PASSWORD_SUCCESS: "REQUEST_PASSWORD_SUCCESS" =
  "REQUEST_PASSWORD_SUCCESS";
export const REQUEST_PASSWORD_FAILED: "REQUEST_PASSWORD_FAILED" =
  "REQUEST_PASSWORD_FAILED";

export const REQUEST_CREATE_USER: "REQUEST_CREATE_USER" = "REQUEST_CREATE_USER";
export const REQUEST_CREATE_USER_SUCCESS: "REQUEST_CREATE_USER_SUCCESS" =
  "REQUEST_CREATE_USER_SUCCESS";
export const REQUEST_CREATE_USER_FAILED: "REQUEST_CREATE_USER_FAILED" =
  "REQUEST_CREATE_USER_FAILED";

export const REQUEST_LOGIN: "REQUEST_LOGIN" = "REQUEST_LOGIN";
export const REQUEST_LOGIN_SUCCESS: "REQUEST_LOGIN_SUCCESS" =
  "REQUEST_LOGIN_SUCCESS";
export const REQUEST_LOGIN_FAILED: "REQUEST_LOGIN_FAILED" =
  "REQUEST_LOGIN_FAILED";

export const CHANGE_USER: "CHANGE_USER" = "CHANGE_USER";
export const CHANGE_USER_SUCCESS: "CHANGE_USER_SUCCESS" = "CHANGE_USER_SUCCESS";
export const CHANGE_USER_FAILED: "CHANGE_USER_FAILED" = "CHANGE_USER_FAILED";

export const CHECK_LOGIN: "CHECK_LOGIN" = "CHECK_LOGIN";
export const CHECK_LOGIN_SUCCESS: "CHECK_LOGIN_SUCCESS" = "CHECK_LOGIN_SUCCESS";
export const CHECK_LOGIN_FAILED: "CHECK_LOGIN_FAILED" = "CHECK_LOGIN_FAILED";

export const LOGOUT: "LOGOUT" = "LOGOUT";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED: "LOGOUT_FAILED" = "LOGOUT_FAILED";

export interface IRequestUser {
  readonly type: typeof REQUEST_USER;
}

export interface IRequestUserSuccess {
  readonly type: typeof REQUEST_USER_SUCCESS;
  readonly userData: TUser;
}

export interface IRequestUserFailed {
  readonly type: typeof REQUEST_USER_FAILED;
}

export interface IRequestPassword {
  readonly type: typeof REQUEST_PASSWORD;
}

export interface IRequestPasswordSuccess {
  readonly type: typeof REQUEST_PASSWORD_SUCCESS;
  readonly passwordMsg: string | any;
}

export interface IRequestPasswordFailed {
  readonly type: typeof REQUEST_PASSWORD_FAILED;
}

export interface IRequestCreateUser {
  readonly type: typeof REQUEST_CREATE_USER;
}

export interface IRequestCreateUserSuccess {
  readonly type: typeof REQUEST_CREATE_USER_SUCCESS;
  readonly user: TUser;
}

export interface IRequestCreateUserFailed {
  readonly type: typeof REQUEST_CREATE_USER_FAILED;
}

export interface IRequestLogin {
  readonly type: typeof REQUEST_LOGIN;
}

export interface IRequestLoginSuccess {
  readonly type: typeof REQUEST_LOGIN_SUCCESS;
  readonly user: TUser;
}

export interface IRequestLoginFailed {
  readonly type: typeof REQUEST_LOGIN_FAILED;
}

export interface IRequestChangeUser {
  readonly type: typeof CHANGE_USER;
}

export interface IRequestChangeUserSuccess {
  readonly type: typeof CHANGE_USER_SUCCESS;
  readonly user: TUser;
}

export interface IRequestChangeUserFailed {
  readonly type: typeof CHANGE_USER_FAILED;
}

export interface IRequestCheckLogin {
  readonly type: typeof CHECK_LOGIN;
}

export interface IRequestCheckLoginSuccess {
  readonly type: typeof CHECK_LOGIN_SUCCESS;
  readonly user: TUser;
}

export interface IRequestCheckLoginFailed {
  readonly type: typeof CHECK_LOGIN_FAILED;
}

export interface IRequestLogout {
  readonly type: typeof LOGOUT;
}

export interface IRequestLogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS;
  readonly user: null;
}

export interface IRequestLogoutFailed {
  readonly type: typeof LOGOUT_FAILED;
}

export type TAuthActions =
  | IRequestUser
  | IRequestUserSuccess
  | IRequestUserFailed
  | IRequestPassword
  | IRequestPasswordSuccess
  | IRequestPasswordFailed
  | IRequestCreateUser
  | IRequestCreateUserSuccess
  | IRequestCreateUserFailed
  | IRequestLogin
  | IRequestLoginSuccess
  | IRequestLoginFailed
  | IRequestLoginFailed
  | IRequestChangeUser
  | IRequestChangeUserSuccess
  | IRequestChangeUserFailed
  | IRequestCheckLogin
  | IRequestCheckLoginSuccess
  | IRequestCheckLoginFailed
  | IRequestLogout
  | IRequestLogoutSuccess
  | IRequestLogoutFailed;

const token = { token: getCookie("token") };
const refreshToken = { token: getCookie("refreshToken") };
// Проверка существет ли юзер при попытке восстановить пароль по емейл
export const requestUser: AppThunk = (data: any) => {
  return function (dispatch: AppDispatch) {
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
      if (err instanceof Error)
        throw new Error(
          `Ошибка в получении сведений о пользователе ${err.message}`
        );
    }
  };
};

// отправка формы с новым паролем и токеном
export const resetPassword: AppThunk = (data) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REQUEST_PASSWORD,
    });
    try {
      requestToServ("password-reset/reset", {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
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
      if (err instanceof Error)
        throw new Error(`Ошибка в смене пароля ${err.message}`);
    }
  };
};

// отправка формы регистрации
export const createUser: AppThunk = (data) => {
  return function (dispatch: AppDispatch) {
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
          setCookie("token", authToken, { path: "/" });
          setCookie("refreshToken", refreshToken, { path: "/" });
        }
      });
    } catch (err) {
      if (err instanceof Error)
        throw new Error(`Ошибка в создании пользователя ${err.message}`);
    }
  };
};

// отправка логин формы если нет токенов в куки
export const requestLogin: AppThunk = (data) => {
  return function (dispatch: AppDispatch) {
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
        if (res.success && res.user) {
          dispatch({
            type: REQUEST_LOGIN_SUCCESS,
            user: res.user,
          });
          let authToken = res.accessToken;
          let refreshToken = res.refreshToken;
          if (authToken && refreshToken) {
            setCookie("token", authToken);
            setCookie("refreshToken", refreshToken);
          }
        } else {
          dispatch({
            type: REQUEST_LOGIN_FAILED,
          });
        }
      });
    } catch (err) {
      if (err instanceof Error)
        throw new Error(`Ошибка при во входе в учетную запись ${err.message}`);
    }
  };
};

// проверка если есть токены. если есть автоматический логин
export const checkLogin: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: CHECK_LOGIN,
    });
    try {
      if (token.token !== undefined) {
        // есть токен, отправляю запрос
        requestToServ("auth/user", {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: getCookie("token"),
          } as HeadersInit,
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }).then((res) => {
          if (res !== undefined && res.success && res.user) {
            // проверка успешного ответа на токен, если да юзер логинится
            dispatch({
              type: CHECK_LOGIN_SUCCESS,
              user: res.user,
            });
          } else {
            // обычный токен не подошел, отправляю рефрешТокен
            requestToServ("auth/token", {
              method: "POST",
              mode: "cors",
              cache: "no-cache",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(getCookie("refreshToken")),
              redirect: "follow",
              referrerPolicy: "no-referrer",
            }).then((res) => {
              if (res) {
                // Обновляю токены после отправки рефрешТокена
                let authToken = res.accessToken;
                let refreshToken = res.refreshToken;
                if (authToken && refreshToken) {
                  setCookie("token", authToken, { path: "/" });
                  setCookie("refreshToken", refreshToken, { path: "/" });
                }
                requestToServ("auth/user", {
                  // делаю запрос с обновленный токеном
                  method: "GET",
                  mode: "cors",
                  cache: "no-cache",
                  credentials: "same-origin",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: authToken,
                  } as HeadersInit,
                  redirect: "follow",
                  referrerPolicy: "no-referrer",
                }).then((res) => {
                  // Успешный логин
                  if (res.success && res.user) {
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
              }
            });
          }
        });
      } else if (token.token === undefined && refreshToken.token) {
        // если рефреш токен есть, а обычного почему-то нет, то отправляю рефреш
        requestToServ("auth/token", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getCookie("refreshToken")),
          redirect: "follow",
          referrerPolicy: "no-referrer",
        })
          .then((res) => {
            if (res.success) {
              // получаю ответ с токенами и записываю их
              let authToken = res.accessToken;
              let refreshToken = res.refreshToken;
              if (authToken && refreshToken) {
                setCookie("token", authToken, { path: "/" });
                setCookie("refreshToken", refreshToken, { path: "/" });
              }
            } else {
              dispatch({
                type: CHECK_LOGIN_FAILED,
              });
            }
            return res; // возвращаю ответ с токенами в then
          })
          .then((data) => {
            requestToServ("auth/user", {
              // отправляю запрос на логин с новым токеном,
              method: "GET",
              mode: "cors",
              cache: "no-cache",
              credentials: "same-origin",
              headers: {
                "Content-Type": "application/json",
                Authorization: data.accessToken,
              } as HeadersInit,
              redirect: "follow",
              referrerPolicy: "no-referrer",
            }).then((res) => {
              if (res && res.user) {
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
      }
    } catch (err) {
      if (err instanceof Error)
        throw new Error(`Ошибка при во входе в учетную запись ${err.message}`);
    }
  };
};

// отправка формы с выходом, куки становятся недействительными. чтобы войти нужно снова ввести логин-пароль
export const logout: AppThunk = () => {
  return function (dispatch: AppDispatch) {
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
        if (res) {
          // удаюа пользователя и очищаю куки
          dispatch({
            type: LOGOUT_SUCCESS,
            user: null,
          });
          DeleteCookie("token");
          DeleteCookie("refreshToken");
        } else {
          dispatch({
            type: CHECK_LOGIN_FAILED,
          });
        }
      });
    } catch (err) {
      if (err instanceof Error)
        throw new Error(`Ошибка при во входе в учетную запись ${err.message}`);
    }
  };
};

// отправка новых данных пользоваетля
export const changeUser: AppThunk = (data) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: CHANGE_USER,
    });
    try {
      requestToServ("auth/user", {
        method: "PATCH",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("token"),
        } as HeadersInit,
        body: JSON.stringify(data),
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }).then((res) => {
        if (res && res.user) {
          // все прошло успешно обновляю данные
          dispatch({
            type: CHANGE_USER_SUCCESS,
            user: res.user,
          });
        } else if (res === undefined) {
          // обычный токен протух, отправляю рефреш
          requestToServ("auth/token", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: getCookie("refreshToken") }),
            redirect: "follow",
            referrerPolicy: "no-referrer",
          })
            .then((res) => {
              // получил рефреш, теперь отправляю с новым токеном и обновляю токены
              let authToken = res.accessToken;
              let refreshToken = res.refreshToken;
              if (authToken && refreshToken) {
                setCookie("token", authToken, { path: "/" });
                setCookie("refreshToken", refreshToken, { path: "/" });
              }
              return requestToServ("auth/user", {
                method: "PATCH",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: authToken,
                } as HeadersInit,
                body: JSON.stringify(data),
                redirect: "follow",
                referrerPolicy: "no-referrer",
              });
            })
            .then((res) => {
              // все хорошо, получены новые токены и новые данные юхера отправлены
              if (res && res.user) {
                dispatch({
                  type: CHANGE_USER_SUCCESS,
                  user: res.user,
                });
              }
            });
        } else {
          dispatch({
            // что-то пошло не так
            type: CHANGE_USER_FAILED,
          });
        }
      });
    } catch (err) {
      if (err instanceof Error)
        throw new Error(`Ошибка при во входе в учетную запись ${err.message}`);
    }
  };
};
