import { Col, Row } from "antd";
import ChgPassBtn from "./chg-pass";
import DeactivateBtn from "./deactivate-btn";
import EditBtn from "./edit-btn";
import QuotaBtn from "./quota-btn";

export default function UserActBtn({
  deactivateProps,
  editProps,
  chgPassProps,
  quotaProps,
}) {
  return (
    <Row gutter={[4, 4]}>
      <Col>
        <QuotaBtn {...quotaProps} />
      </Col>
      <Col>
        <EditBtn {...editProps} />
      </Col>
      <Col>
        <ChgPassBtn {...chgPassProps} />
      </Col>
      <Col>
        <DeactivateBtn {...deactivateProps} />
      </Col>
    </Row>
  );
}
