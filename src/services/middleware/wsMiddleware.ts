// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from "redux";
import type { TApplicationActions, AppDispatch, RootState } from "../types";
import { getCookie } from "../api/api";
import { TWSStoreActions } from "../actions/ws";

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action: TApplicationActions) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;

      const loginData = getState().auth.loginData;

      const token = getCookie("token")?.replace("Bearer ", "");

      if (type === wsInit) {
        // объект класса WebSocket
        socket = new WebSocket(action.payload);
      }
      if (type === wsInit && loginData) {
        socket = new WebSocket(`${action.payload}?token=${token}`);
      }

      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          console.log(event);
          dispatch({ type: onError, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
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
