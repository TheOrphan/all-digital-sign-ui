import { InboxOutlined } from "@ant-design/icons";
import { message, Input, Upload } from "antd";

const create = [
  {
    props: {
      key: "user_id",
      name: "user_id",
      hidden: true,
    },
    ele: <Input />,
  },
  {
    props: {
      key: "raw_doc",
      name: "raw_doc",
      label: "Upload a document",
      valuePropName: "fileList",
      noStyle: true,
      getValueFromEvent: (e) => {
        console.log("Upload event:", e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
      },
    },
    ele: (
      <Upload.Dragger
        accept="application/pdf"
        name="raw_doc"
        multiple={true}
        onChange={(info) => {
          // if (info.file.status !== "uploading") {
          // console.log(info.file, info.fileList);
          // }
          if (info.file.status === "done") {
            message.success(
              `${info.file.name} file added to list successfully`
            );
          } else if (info.file.status === "error") {
            message.error(`${info.file.name} failed added to the list.`);
          }
        }}
        progress={{
          strokeColor: {
            "0%": "#108ee9",
            "100%": "#87d068",
          },
          strokeWidth: 3,
          format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
      </Upload.Dragger>
    ),
  },
];

export default create;
