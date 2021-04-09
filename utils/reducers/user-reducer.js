import Router from "next/router";
import * as CryptoJS from "crypto-js";

const status = {
  checking: "CHECK",
  success: true,
  error: false,
};

export default function userReducer(state, action) {
  const { type, token, currentRoute, email, data } = action;
  switch (type) {
    /**
     * JIKA BROWSER REFRESH, INIT
     */
    case "init":
      let initHomeRoute = true;
      let initIsUserLoggedIn = status.checking;
      let initToken = localStorage.getItem("token");
      let initUser = localStorage.getItem("email");
      let initRoute = localStorage.getItem("route");
      let initPrevRoute = localStorage.getItem("prev-route");
      let initData = localStorage.getItem("data");
      let initSecret = localStorage.getItem("secret");
      if (initData && initSecret) {
        const initDecrypted = CryptoJS.AES.decrypt(
          localStorage.getItem("data"),
          localStorage.getItem("secret")
        );
        initData = JSON.parse(initDecrypted.toString(CryptoJS.enc.Utf8));
      }

      /**
       * JIKA TOKEN TERSEDIA, IJINKAN USER KE DASHBOARD
       * DAN KE CURRENT ROUTE
       */
      if (initToken) {
        initIsUserLoggedIn = status.success;
        initHomeRoute = false;
      } else {
        /**
         * JIKA TOKEN TIDAK TERSEDIA, DAN JIKA ROUTE YANG DIMINTA BUKAN
         * SALAH SATU DARI ROUTE INI, MAKA UBAH ROUTE KE HOME
         */
        localStorage.clear();
        initIsUserLoggedIn = status.error;
        initUser = null;
        initToken = null;
        initRoute = "/";
      }
      if (
        initPrevRoute !== "/" &&
        state.currentRoute === "/" &&
        !initHomeRoute
      ) {
        Router.push(initPrevRoute);
      } else if (initRoute === "/" && !initHomeRoute) {
        initRoute = process.env.INITIAL_PAGES;
        Router.push(initRoute);
      } else if (!initUser && !initToken) {
        Router.push(initRoute);
      }
      return {
        ...state,
        token: initToken,
        data: initData,
        currentRoute: state.currentRoute || initRoute,
        isUserLoggedIn: initIsUserLoggedIn,
        homeRoute: initHomeRoute,
        prevRoute: initPrevRoute,
      };

    case "login":
      localStorage.clear();
      const secret = Math.random()
        .toString(36)
        .substr(2, 5);
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), secret);
      localStorage.setItem("token", token);
      localStorage.setItem("secret", secret);
      localStorage.setItem("email", email);
      localStorage.setItem("data", encrypted);
      localStorage.setItem("route", currentRoute);
      const loginToken = localStorage.getItem("token");
      const loginRoute = localStorage.getItem("route");
      const loginUser = localStorage.getItem("email");
      const loginPrevRoute = localStorage.getItem("prev-route");
      const loginDecrypted = CryptoJS.AES.decrypt(
        localStorage.getItem("data"),
        secret
      );
      const loginData = JSON.parse(loginDecrypted.toString(CryptoJS.enc.Utf8));
      Router.push(loginPrevRoute || currentRoute);
      return {
        ...state,
        token: loginToken,
        data: loginData,
        currentRoute: loginPrevRoute || loginRoute,
        isUserLoggedIn: status.success,
        homeRoute: false,
        email: loginUser,
      };

    case "logout":
      localStorage.clear();
      Router.push("/");
      return {
        ...state,
        token: null,
        data: null,
        isUserLoggedIn: status.error,
        homeRoute: true,
        email: null,
      };

    case "checking":
      return {
        ...state,
        isUserLoggedIn: status.checking,
      };

    case "change_route":
      localStorage.setItem("prev-route", state.currentRoute);
      localStorage.setItem("route", currentRoute);
      return {
        ...state,
        currentRoute,
      };
    default:
      throw new Error();
  }
}
