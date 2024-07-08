import { io /*Socket*/ } from "socket.io-client";
import { SOCKET_URL } from "../../configs";
import { store } from "../../store";

const instance = io(SOCKET_URL, {
  query: {
    token: store.getState().auth.accessToken,
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

// export default new SocketClient();
