import { useState, useEffect, useReducer } from "react";
import axios from "axios";

export default function useLogin() {
  const [options, setOptions] = useState(() => null);
  const [state, dispatch] = useReducer(loginReducer, {
    code: null,
    title: null,
    message: null,
    isLoading: true,
  });

  useEffect(() => {
    let didCancel = false;

    async function postData() {
      dispatch({ type: "LOGIN_INIT" });
      let result = null;

      try {
        result = await axios(options);
        // console.log('Response Success Result: ', result);
        if (!didCancel) {
          const token = result.data.accessToken
            ? result.data.accessToken
            : false;

          dispatch({ type: "success", result: result.data, token });
        }
      } catch (error) {
        if (error.response) {
          dispatch({ type: "error", result: error.response.data });
        }
      }
    }

    if (options !== null) {
      postData();
    }

    return () => {
      didCancel = true;
    };
  }, [options]);

  function login(api, params) {
    setOptions({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: process.env.BE + api,
      data: params,
    });
  }

  return [state, login];
}

function loginReducer(state, action) {
  const { type, result, token } = action;

  switch (type) {
    case "LOGIN_INIT":
      return {
        code: null,
        title: null,
        message: null,
        isLoading: true,
      };

    case "success":
      return {
        ...state,
        code: result.code,
        title: result.title,
        message: result.message,
        token,
        data: result.data,
        isLoading: false,
        isError: false,
      };

    case "error":
      return {
        ...state,
        code: result.code,
        title: result.title,
        message: result.message,
        isLoading: false,
        isError: true,
      };

    default:
      throw new Error();
  }
}
