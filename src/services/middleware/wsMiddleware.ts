// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from "redux";
import type { TApplicationActions, AppDispatch, RootState } from "../types";
import { getCookie } from "../api/api";

const wsUrlAll: string = "wss://norma.nomoreparties.space/orders/all";
const wsUrlPrivate: string = "wss://norma.nomoreparties.space/orders";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type } = action;

      const token = getCookie("token")?.replace("Bearer ", "");

      if (type === "WS_CONNECTION_START_PUBLIC") {
        // объект класса WebSocket
        socket = new WebSocket(wsUrlAll);
      }
      if (type === "WS_CONNECTION_START_PRIVATE") {
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrlPrivate}?token=${token}`);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: "WS_CONNECTION_SUCCESS", payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: "WS_CONNECTION_ERROR", payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          dispatch({ type: "WS_GET_MESSAGE", payload: JSON.parse(data) });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: "WS_CONNECTION_CLOSED", payload: event });
        };

        if (type === "WS_SEND_MESSAGE") {
          const message = action.payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
