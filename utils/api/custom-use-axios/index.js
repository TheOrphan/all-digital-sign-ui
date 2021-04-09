import { useState, useEffect, useReducer } from "react";
import axios from "axios";
import Router from "next/router";

/**
 * User Library
 */
import { fetchReducer } from "../../reducers";

import useLogin from "./useLogin";

export { useLogin };

export function usePost() {
  const [state, dispatch] = useReducer(fetchReducer, {
    code: null,
    title: null,
    message: null,
    isLoading: true,
  });
  const [options, setOptions] = useState(null);

  useEffect(() => {
    let didCancel = false;

    async function post() {
      try {
        const result = await axios(options);
        if (!didCancel) {
          dispatch({
            type: "FETCH_SUCCESS",
            result: result,
          });
        }
      } catch (error) {
        // console.log(error);
        if (error) {
          dispatch({
            type: "FETCH_ERROR",
            result: error,
          });
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          // } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // console.log(error.request);
          // } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message);
        }
      }
    }

    if (options !== null || !options) {
      post();
    }

    return () => {
      didCancel = true;
    };
  }, [options]);

  function postData(params) {
    setOptions(params);
  }

  return [state, postData];
}

export function useGet() {
  const [state, dispatch] = useReducer(fetchReducer, {
    code: null,
    title: null,
    message: null,
    isLoading: true,
  });
  const [options, setOptions] = useState(null);

  useEffect(() => {
    let didCancel = false;

    async function get() {
      try {
        const result = await axios(options);
        if (!didCancel) {
          dispatch({
            type: "FETCH_SUCCESS",
            result: result,
          });
        }
      } catch (error) {
        // console.log(error);
        if (error) {
          dispatch({
            type: "FETCH_ERROR",
            result: error,
          });
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      }
    }

    if (options !== null || !options) {
      get();
    }

    return () => {
      didCancel = true;
    };
  }, [options]);

  function getData(params) {
    setOptions(params);
  }

  return [state, getData];
}
