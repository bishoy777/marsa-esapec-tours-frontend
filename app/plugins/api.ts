import axios from "axios";
import { useRuntimeConfig, defineNuxtPlugin } from "#app";
import { useToast } from "@/composables/useToast";
import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
export default defineNuxtPlugin((nuxtApp) => {
  console.log("config.public.nuxtApp");
  const { addToast } = useToast();
  const config = useRuntimeConfig();

  const instance = axios.create({
    baseURL: config.public.apiBase as string,
  });

  instance.interceptors.request.use(
    (axiosConfig: InternalAxiosRequestConfig) => {
      console.log(config.public);
      const token = useCookie("token").value;
      axiosConfig.headers.Authorization = `Barear ${token}`;
      axiosConfig.headers["Accept-Language"] = "ar";

      return axiosConfig;
    },
  );
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const message = (error.response?.data as any)?.message;
      console.log(error);
      addToast(message, "error");
    },
  );
  return {
    provide: {
      api: instance,
    },
  };
});
