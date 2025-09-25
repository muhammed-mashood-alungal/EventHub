import axios from "axios";

const createAxiosInstance = (baseUrl: string) => {
  const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("event_hub_token")
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

const authInstance = createAxiosInstance(
  `${import.meta.env.VITE_BACKEND_URL}/auth`
);
const eventInstance = createAxiosInstance(
  `${import.meta.env.VITE_BACKEND_URL}/events`
);
const ticketInstance = createAxiosInstance(
  `${import.meta.env.VITE_BACKEND_URL}/tickets`
);

export { authInstance, eventInstance, ticketInstance };
