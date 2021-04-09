import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

import GlobalProvider, { UserContext } from "utils/context";
import { default as MainLayout } from "components/layout";
import { axiosPost } from "utils/fetcher";
import "../assets/antd.override.less";
import { SyncOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";

function App(props) {
  // token trigery
  const [checkToken, setCheckToken] = useState(0);

  // user status trigery
  const [userStatus, setUserStatus] = useState(0);

  // next router
  const router = useRouter();
  const { pathname, route, asPath, query } = router;

  // props and UserContext
  const { Component, pageProps } = props;
  const { user, dispatchUser } = useContext(UserContext);

  // token proof
  useEffect(async () => {
    const check = await axiosPost("/auth/token");
    setCheckToken(check.code);
  }, []);

  // dispatch user based token proof
  useEffect(() => {
    if (checkToken && checkToken === 401) {
      dispatchUser({ type: "logout" });
      setUserStatus(1);
    }
    if (checkToken && checkToken !== 401) {
      dispatchUser({ type: "init" });
      setUserStatus(1);
    }
  }, [checkToken]);

  // track user browsing
  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log("App is changing to: ", url);
      dispatchUser({
        type: "change_route",
        currentRoute: url,
      });
    };
    router.events.on("routeChangeStart", handleRouteChange);
    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  // if token proof ( token and user status triggered)
  if (checkToken && userStatus) {
    if (!user.isUserLoggedIn && route === "/") {
      return <Component {...pageProps} />;
    } else if (user.isUserLoggedIn && route !== "/" && checkToken !== null) {
      return (
        <MainLayout user={user}>
          <Component {...pageProps} />
        </MainLayout>
      );
    }
  }

  return (
    <Row
      justify="space-around"
      align="middle"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Col span={6} style={{ fontSize: 20, textAlign: "center" }}>
        <SyncOutlined spin /> Authenticating token...
      </Col>
    </Row>
  );
}

export default function Wrapper(props) {
  return (
    <GlobalProvider>
      <App {...props} />
    </GlobalProvider>
  );
}
