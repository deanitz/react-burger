import { Middleware } from "@reduxjs/toolkit";
import { IWebsocketActions } from "../../types/utilityTypes";
import { RootState } from "../../utils/store";
import { logError, logInfo } from "../logService";

const RECONNECT_TIMEOUT = 3000;
const CLOSE_NORMAL = 1000;

export const createSocketMiddleware = <TData>(
  wsActions: IWebsocketActions<TData>
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let url = "";
    let isConnected = false;
    let reconnectTimer = 0;

    return (next) => (action) => {
      const { dispatch } = store;
      const {
        connect,
        disconnect,
        wsClose,
        wsConnecting,
        wsError,
        wsMessage,
        wsOpen,
      } = wsActions;

      if (connect.match(action)) {
        logInfo("Websocket connect");
        url = action.payload;
        socket = new WebSocket(url);
        isConnected = true;
        window.clearTimeout(reconnectTimer);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpen());
        };

        socket.onerror = () => {
          dispatch(wsError("Websocket error"));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data) as TData;
          dispatch(wsMessage(parsedData));
        };

        socket.onclose = (event) => {
          if (event.code !== CLOSE_NORMAL) {
            logError(`Websocket error: closed with error ${event.code}`);
            dispatch(wsError(event.code.toString()));
          }
          logInfo("Websocket disconnect");

          if (isConnected) {
            dispatch(wsConnecting());
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_TIMEOUT);
          }
        };

        if (disconnect.match(action)) {
          logInfo("Websocket disconnect");
          window.clearTimeout(reconnectTimer);
          isConnected = false;
          reconnectTimer = 0;
          dispatch(wsClose());
          socket.close(CLOSE_NORMAL);
        }
      }

      next(action);
    };
  };
};
