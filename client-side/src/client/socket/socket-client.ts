import { io } from "socket.io-client";
import { store } from "../../store";

const url = process.env.REACT_APP_SOCKET_URL || "";

const instance = io(url, {
  query: {
    token: store.getState().auth.atoken,
  },
});

export class SocketClient {
  static instance = instance;

  static on(event: string, callback: (...args: Array<any>) => void) {
    return this.instance.on(event, callback);
  }

  static off(event: string, callback: (...args: Array<any>) => void) {
    return this.instance.off(event, callback);
  }

  static emit(event: string, ...args: Array<any>) {
    return this.instance.emit(event, ...args);
  }
}
