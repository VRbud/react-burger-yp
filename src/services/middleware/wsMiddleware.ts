// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from "redux";
import type { TApplicationActions, AppDispatch, RootState } from "../types";
import { TWSStoreActions } from "../actions/ws";
import { getCookie, requestToServ, setCookie } from "../api/api";

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (type === wsInit) {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        if (type === "WS_CLOSE") {
          socket?.close();
        }
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;

          if (data.message === "Invalid or missing token") {
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
              let authToken = res.accessToken;
              let refreshToken = res.refreshToken;
              if (authToken && refreshToken) {
                setCookie("token", authToken, { path: "/" });
                setCookie("refreshToken", refreshToken, { path: "/" });
              }
            });
          }
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };
        // функция, которая вызывается при закрытии соединения

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = action.payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
