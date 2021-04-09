import { useRouter } from "next/router";
import { useState, useEffect, useReducer } from "react";
import { userReducer } from "../../reducers";
import axios from "axios";
const URL = process.env.BE;

export default function useLogin() {
  const router = useRouter();
  const [options, setOptions] = useState(() => null);
  const [state, dispatch] = useReducer(loginReducer, {
    code: null,
    title: null,
    message: null,
    isLoading: true,
  });
  const [stateLogin, dispatchLogin] = useReducer(userReducer, {});

  useEffect(() => {
    let didCancel = false;

    async function postData() {
      dispatch({ type: "LOGIN_INIT" });
      let result = null;

      try {
        result = await axios(options);
        if (!didCancel) {
          const token = result.data.accessToken
            ? result.data.accessToken
            : false;

          dispatch({ type: "success", result, token });
          dispatchLogin({
            type: "login",
            email: result.data.result.email,
            currentRoute: router.asPath,
            data: result.data.result,
          });
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
      url: URL + api,
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
        code: result.status,
        title: result.statusText,
        message: result.data?.message,
        token,
        data: result.data,
        isLoading: false,
        isError: false,
      };

    case "error":
      return {
        ...state,
        code: status,
        title: result.statusText,
        message: result.data.message,
        isLoading: false,
        isError: true,
      };

    default:
      throw new Error();
  }
}
