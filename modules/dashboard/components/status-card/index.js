import { Card, Col, Row } from "antd";

export default function IndexPage({ icon, title, data }) {
  return (
    <Card loading={data != 0 && !data} bodyStyle={{ padding: 8 }}>
      <Row justify="space-around" align="middle">
        <Col span={8} style={{ textAlign: "center" }}>
          <i style={{ fontSize: "3em" }}>{icon}</i>
        </Col>
        <Col span={16} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10 }}>{title.last}</div>
          <div style={{ fontSize: 14, lineHeight: 1, paddingBottom: 8 }}>
            {title.first}
          </div>
          <div style={{ fontSize: 18 }}>{data}</div>
        </Col>
      </Row>
    </Card>
  );
}
