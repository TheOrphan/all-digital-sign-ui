import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
// import axios from "axios";

const URL = process.env.BE;

export default function useCekLogin() {
  const currentRoute = useRouter().route;
  const [status, setState] = useState(false);

  /**
   * JIKA USER MELAKUKAN REFRESH BROWSER
   * PROSES INI AKAN SELALU DIJALANKAN
   * ALL STATES BACK TO DEFAULT, TERMASUK USER!
   */
  useEffect(() => {
    function cekToken() {
      // const initToken = localStorage.getItem("token");
      const initToken = localStorage.getItem("email");
      if (initToken) {
        return initToken;
      }
      return null;
    }

    async function cekLogin() {
      const initToken = cekToken();
      if (initToken) {
        /**
         * CEK Ke backend apa token masih valid
         */

        // const options = {
        //   method: "post",
        //   headers: {
        //     Authorization: `Bearer ${initToken}`,
        //     "Content-Type": "application/json",
        //   },
        //   url: URL + "auth/login-check",
        // };

        try {
          // const statusToken = await axios(options);
          // const data = await statusToken.data;
          // console.log('STATUS TOKEN BERHASIL', statusToken);
          setState(true);
          Router.push(currentRoute);
        } catch (error) {
          console.log("EMAIL WAS DESTROYED!", error);
          // console.log("STATUS TOKEN ERROR", error);
        }
      }
    }

    if (!status) {
      // console.log("STATUS TOKEN FUNCTION", status);
      cekLogin();
    }
  }, [status]);

  return [status];
}

export const NotAuthorized = () => (
  <h1>Maaf, sesi Anda telah habis, silahkan logout dan login ulang kembali</h1>
);
