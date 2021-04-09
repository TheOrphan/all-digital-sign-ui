import { useState, useEffect } from "react";
import { usePost } from "./custom-use-axios";

const URL = process.env.BE;

/**
 * User Library
 */
import { useLogin } from "./custom-use-axios";

export { useLogin };

export default function usePostData(initialAPI, initialParams) {
  const [token, setToken] = useState("");
  const [options, setOptions] = useState(null);
  const [state, postData] = usePost();

  useEffect(() => {
    const initToken = localStorage.getItem("token");
    setToken(initToken);
    if (initToken && initialAPI) {
      setOptions({ api: initialAPI, params: initialParams });
    }

    if (initialAPI) {
      setOptions({ api: initialAPI, params: initialParams });
    }
  }, []);

  useEffect(() => {
    if (options !== null) {
      const { api, params } = options;

      const headers = token
        ? { ...params?.headers, Authorization: `Bearer ${token}` }
        : params?.headers;

      const newParams = {
        method: "post",
        url: URL + api,
        data: params?.body ? params.body : params,
        headers: headers,
      };

      postData(newParams);
      setOptions(null);
    }
  }, [options]);

  function getParams(api, params) {
    setOptions({ api, params });
  }

  return [state, getParams];
}
