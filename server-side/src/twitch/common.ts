import axios from "axios";
import config from "config";

const { tw_auth_url, tw_client_id, tw_client_secret } =
  config.get<any>("twitch");

export const getAuthToken = async () => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const params = new URLSearchParams({
    client_id: tw_client_id,
    client_secret: tw_client_secret,
    grant_type: "client_credentials",
  });

  return axios(tw_auth_url, {
    method: "POST",
    headers: headers,
    params,
  })
    .then((res) => res.data.access_token)
    .catch((e) => {
      console.error(
        JSON.stringify({ action: "authToken catch", message: e.message })
      );
      return { error: true, message: e.message };
    });
};
