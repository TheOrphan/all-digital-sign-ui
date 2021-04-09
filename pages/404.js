import { useContext } from "react";
import { Row, Col, Button } from "antd";
import Link from "next/link";
import { UserContext } from "utils/context";

function NotPage() {
  const { user, dispatchUser } = useContext(UserContext);
  return (
    <>
      <Row
        justify="space-around"
        align="middle"
        style={{
          background: "white",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 99999,
        }}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          404
        </div>
      </Row>
    </>
  );
}

export default NotPage;
