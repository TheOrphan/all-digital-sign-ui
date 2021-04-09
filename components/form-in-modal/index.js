import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, Form } from "antd";
import {
  FormOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const CollectionCreateForm = ({
  title,
  visible,
  onCreate,
  onCancel,
  fields,
  type,
  name,
  rowName,
  initialValues,
}) => {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  useEffect(() => {
    if (formRef.current && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, formRef]);
  return (
    <Modal
      destroyOnClose={true}
      visible={visible}
      title={`${title} ${type === "add" ? "new" : rowName}`}
      okText="Simpan"
      cancelText="Batalkan"
      onCancel={onCancel}
      maskClosable={false}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        ref={formRef}
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={initialValues}
      >
        {fields.map((field) => (
          <Form.Item key={field.props.name} {...field.props}>
            {field.ele}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

const ModalForm = ({
  title,
  handleSubmit,
  fields,
  iconComp,
  type = "add",
  name,
  initialValues,
  rowName = "",
  buttonProps,
}) => {
  const [visible, setVisible] = useState(false);
  const onCreate = (values) => {
    handleSubmit(values);
    console.log("Received values of form: ", values);
    setVisible(false);
  };
  return (
    <div>
      <Button
        type={`${type === "update" ? "default" : "primary"}`}
        style={{
          background: type === "update" && "#fa8c16",
          color: type === "update" && "#ffffff",
          border: type === "update" && "solid 1px #fa8c16",
        }}
        onClick={() => {
          setVisible(true);
        }}
        {...buttonProps}
      >
        {iconComp ? (
          iconComp
        ) : type !== "upload" ? (
          type === "update" ? (
            <FormOutlined />
          ) : (
            <PlusCircleOutlined />
          )
        ) : (
          <UploadOutlined />
        )}
        {title && " " + title}
      </Button>
      <CollectionCreateForm
        rowName={rowName}
        name={name}
        initialValues={initialValues}
        title={title || type}
        fields={fields}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default ModalForm;
