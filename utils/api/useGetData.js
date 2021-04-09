import { useState, useEffect } from "react";
import { useGet } from "./custom-use-axios";

const URL = process.env.BE;

export default function useGetData(initialAPI, initialParams) {
  const [options, setOptions] = useState(null);
  const [state, getData] = useGet();

  useEffect(() => {
    if (initialAPI) {
      setOptions({ api: initialAPI, params: initialParams });
    }
  }, []);

  useEffect(() => {
    if (options !== null) {
      const { api, params } = options;
      let request = "";
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          request += `/${params[key]}`;
        }
      }
      const newParams = {
        method: "get",
        url: URL + api + request,
      };
      getData(newParams);
      setOptions(null);
    }
  }, [options]);

  function getParams(api, params) {
    setOptions({ api, params });
  }

  return [state, getParams];
}
