import Router from "next/router";

export default function fetchReducer(state, action) {
  // console.log(state);
  // console.log(action);
  const { type, result } = action;

  switch (type) {
    case "FETCH_INIT":
      return {
        code: null,
        title: null,
        message: null,
        isLoading: true,
      };
    case "FETCH_SUCCESS":
      const { status, statusText, pagination } = result;
      /**
       * Supaya nomor urut bertambah pada saat pindah halaman,
       * tanpa ini, maka setiap halaman memiliki nomor urut yang sama: 1-10
       */
      const numberAddition =
        result.pagination && result.pagination.page
          ? result.pagination.page * 10 - 10
          : 0;
      /**
       * Menambahkan nomor urut
       */
      const message = result.data.message;
      const data =
        result.data.result && Array.isArray(result.data)
          ? result.data.result.map((data, index) => {
              const key = { key: index + 1 + numberAddition };
              return { ...key, ...data };
            })
          : result.data;
      return {
        ...state,
        code: status,
        title: statusText,
        message,
        data,
        pagination,
        isLoading: false,
        isError: false,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        code: result.status,
        title: result.statusText,
        message: result?.data?.message,
        isLoading: false,
        isError: true,
      };

    case "FETCH_FAILURE":
      return {
        ...state,
        code: result.status,
        title: result.statusText,
        message: result.data.message,
        data: result.data,
        isLoading: false,
        isError: true,
      };

    case "NETWORK_FAILURE":
      return {
        ...state,
        code: 500,
        title: "Network Error",
        message:
          "Sepertinya ada masalah dengan koneksi jaringan Anda, harap hubungi technical support",
        isLoading: false,
        isError: true,
      };

    case "UNAUTHORIZED":
      return {
        ...state,
        code: 400,
        title: "Unauthorized",
        message: "Anda harus login",
        isLoading: false,
        isError: true,
      };

    default:
      throw new Error();
  }
}
