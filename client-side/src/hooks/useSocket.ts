import { useEffect } from "react";
import { SocketClient } from "../client";

export const useSocket = (
  event: string,
  callback?: (...args: Array<any>) => void
) => {
  useEffect(() => {
    if (callback) {
      SocketClient.on(event, callback);

      return () => {
        SocketClient.off(event, callback);
      };
    }
  }, []);

  const emitEvent = (...args: Array<any>) => SocketClient.emit(event, ...args);

  return [emitEvent];
};
