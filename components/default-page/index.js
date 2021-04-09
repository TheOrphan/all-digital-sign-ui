import { Row, Col, Table, Pagination } from "antd";
import { useRouter } from "next/router";
import ModalForm from "components/form-in-modal";

export default function CustomTable({
  title,
  tableProps,
  pageProps,
  modalAddProps,
  separatePagination = true,
}) {
  const router = useRouter();
  const queries = router.query;
  const pathname = router.pathname;

  const defaultTableProps = {
    pagination: !separatePagination && { pageSize: 5 },
    scroll: { scrollToFirstRowOnChange: true, x: true },
    size: "small",
  };
  const onChange = (current) => {
    router.push({
      pathname: pathname,
      query: { ...queries, page: current },
    });
  };

  const defaultPageProps = {
    //default pagination rules
    // size: "small",
    onChange,
  };

  return (
    <Row>
      <Col span={12}>
        <h2>{title}</h2>
      </Col>
      <Col span={12} style={{ textAlign: "right" }}>
        {modalAddProps && (
          <ModalForm
            name={title}
            initialValues={modalAddProps.initialValues}
            type={modalAddProps.type || false}
            title={`${
              modalAddProps.type !== "upload" ? "Add new " : "Upload"
            } ${modalAddProps.title.toLowerCase()}`}
            handleSubmit={modalAddProps.handleCreate}
            fields={modalAddProps.fields}
          />
        )}
      </Col>
      <Col span={24}>
        <Table {...{ ...tableProps, ...defaultTableProps }} />
      </Col>
      <Col span={24} style={{ textAlign: "right", marginTop: "1rem" }}>
        {separatePagination && (
          <Pagination {...{ ...pageProps, ...defaultPageProps }} />
        )}
      </Col>
    </Row>
  );
}
