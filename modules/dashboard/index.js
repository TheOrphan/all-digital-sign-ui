import { useRouter } from "next/router";
import { getAll } from "./datas/fetch";
import { Col, Row } from "antd";
import {
  AuditOutlined,
  FileTextOutlined,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import StatusCard from "./components/status-card";

export default function IndexPage() {
  const router = useRouter();
  const { getAllData, getAllLoading, getAllPagination } = getAll(router.asPath);
  const statuses = [
    {
      title: { first: "Ready to sign", last: "Document" },
      icon: <FileTextOutlined />,
      data: getAllData?.RAW,
    },
    {
      title: { first: "Signed", last: "Document" },
      icon: <AuditOutlined />,
      data: getAllData?.SIGNED,
    },
    {
      title: { first: "Canceled", last: "Document" },
      icon: <IssuesCloseOutlined />,
      data: getAllData?.CANCELED,
    },
  ];
  return (
    <Row gutter={24}>
      {statuses.map((each) => (
        <Col span={6}>
          <StatusCard icon={each.icon} title={each.title} data={each.data} />
        </Col>
      ))}
    </Row>
  );
}
