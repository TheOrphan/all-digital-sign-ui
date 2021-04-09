import { notification } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

let keySWR;

export default function useFetch({ key, api, data, args, options }) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  let defaultAuth = {};
  if (token) {
    defaultAuth = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }
  const reqHeaders = args?.headers
    ? {
        ...args.headers,
        ...defaultAuth,
      }
    : defaultAuth;
  keySWR = key;
  const defaultParam = data?.page !== "all" ? { page: 1, size: 10 } : {};
  const fetcher = () =>
    axios({
      url: process.env.BE + api,
      method: args?.method || "POST",
      data: { ...defaultParam, ...data },
      ...args,
      headers: reqHeaders,
    }).then((res) => res);
  const { data: response, error } = useSWR(key, fetcher, { ...options });
  const receivedData = response?.data?.data;
  const dataWithKey = Array.isArray(receivedData)
    ? response?.data?.data.map((each) => {
        return { key: each.id, ...each };
      })
    : receivedData;
  return {
    data: dataWithKey,
    pagination: response?.data?.pagination,
    res: response,
    isLoading: !error && !dataWithKey,
    isError: error,
  };
}

export function axiosPost(url, data, headers) {
  const token = localStorage.getItem("token");
  let defaultAuth = {};
  if (token) {
    defaultAuth = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }
  return axios({
    method: "post",
    url: process.env.BE + url,
    data,
    headers: {
      ...headers,
      ...defaultAuth,
    },
  })
    .then(function(response) {
      const defaultResponse = response?.data?.message;
      if (url !== "/auth/token" && url !== "/repositories/stamping") {
        notification.success({
          message: "Success",
          description: defaultResponse,
          placement: "bottomRight",
        });
      }
      mutate(keySWR);
      return response.data;
    })
    .catch(function(error) {
      const defaultError = error?.response?.data?.message;
      const code = error?.response?.data?.code;
      let msg_error;
      if (defaultError?.toLowerCase().includes("constraint")) {
        msg_error =
          "Won't continue the operation cause the data used by other(s)";
      }
      if (url !== "/auth/token") {
        notification.error({
          message: "Error " + (code ?? ""),
          description: msg_error || defaultError,
          placement: "bottomRight",
        });
      }
      return { code, error: defaultError };
    });
}
