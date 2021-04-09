import {
  AuditOutlined,
  CheckCircleTwoTone,
  DeleteOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import { Col, notification, Popconfirm, Row } from "antd";
import axios from "axios";
import * as dayjs from "dayjs";
import useFetch, { axiosPost } from "utils/fetcher";
import { urltoFile } from "../../../utils/helpers/helper";
const api = "/repositories";

const handleGenerateStamp = async ({
  id,
  user_id,
  name,
  raw_doc,
  loginParam,
  state, dispatch
}) => {
  const today = dayjs(new Date()).format("DDMMYYHHmmsss");
  dispatch({ type: "PROGRESS_START", key: user_id + name + raw_doc, step: 1, msg: "Authorizing." });
  return await axios
    .post(process.env.PERURICA_LOGIN_URL, loginParam)
    .then(async (res) => {
      dispatch({ type: "PROGRESS_UP", step: 2, msg: "Authorized." });
      const token = res?.data?.result?.data?.login?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const stampPAram = {
        namadoc: name,
        nilaidoc: "10000",
        metadata: "",
      };
      dispatch({ type: "PROGRESS_UP", step: 3, msg: "Requesting e-Materai." });
      return await axios
        .post(process.env.PERURICA_STAMP_URL, stampPAram, config)
        .then(async (resParam) => {
          const stampImg = await urltoFile(
            "data:image/png;base64," + resParam?.data?.result?.image,
            today + "-" + name.replace(" ", "-") + ".png",
            "image/png"
          );
          const url = api + "/stamp-upload";
          const config = {
            ContentEncoding: "base64",
            ContentType: "image/jpeg",
          };
          let bodyFormData = new FormData();
          bodyFormData.append("user_id", user_id.id);
          bodyFormData.append("name", name);
          bodyFormData.append("raw_doc", raw_doc);
          bodyFormData.append("id", id);
          bodyFormData.append("stamp", stampImg);
          bodyFormData.append("reference_doc", resParam?.data?.result?.sn);
          dispatch({ type: "PROGRESS_UP", step: 4, msg: "Materai generated." });
          return axiosPost(url, bodyFormData, config);
        });
    });
};
const handleStampingDocument = async ({
  id,
  user_id,
  name,
  raw_doc,
  stamp,
  reference_doc,
  reason,
  location,
  certificatelevel,
  loginParam,state, dispatch,
}) => {
  const today = dayjs(new Date()).format("DDMMYYHHmmsss");
  return await axios
    .post(process.env.PERURICA_LOGIN_URL, loginParam)
    .then(async (res) => {
      dispatch({ type: "PROGRESS_UP", step: 5,  msg: "Placing e-Materai." });
      const token = res?.data?.result?.data?.login?.token;
      const stampingParams = {
        // certificatelevel, //: "NOT_CERTIFIED",
        certificatelevel: "NOT_CERTIFIED",
        dest: `${process.env.SIGN_ADAPTER_DEST}/${today}_${name}_signed.pdf`,
        location: "JAKARTA",
        profileName: process.env.PERURICA_PROFILE_NAME,
        reason: "TESTING LOCAL",
        spesimenPath: `${process.env.SIGN_ADAPTER_STAMP}/${stamp}`,
        src: `${process.env.SIGN_ADAPTER_RAW}/${raw_doc}`,
        visLLX: 250,
        visLLY: 710,
        visSignaturePage: 1,
        visURX: 340,
        visURY: 800,
        jwtoken: token,
        refToken: reference_doc,
      };
      await axiosPost(api + "/stamping", stampingParams).then(
        async (resParam) => {
          dispatch({ type: "PROGRESS_UP", step: 6, msg: "Putting the e-Materai." })
          if (resParam.code > 201 || resParam.status === "False") {
            if (resParam.status) {
              notification.error({
                message: "Error " + (resParam.errorCode ?? ""),
                description:
                  resParam.errorMessage ||
                  "Error on sign-adapter contact IT Dept",
                placement: "bottomRight",
              });
            }
            return false;
          }
          const url = api + "/stamped-upload";
          const updateFinalDoc = {
            user_id: user_id,
            // user_id: user_id.id,
            name: name,
            raw_doc: raw_doc,
            id: id,
            stamp: stamp,
            reference_doc: reference_doc,
            final_doc: today + "_" + name + "_signed.pdf",
          };
          dispatch({ type: "PROGRESS_COMPLETE", step: 7, });
          return axiosPost(url, updateFinalDoc);
        }
      );
    });
};

export function getAll(key, data, userCtx, state, dispatch) {
  const { data: theData, pagination, res, isLoading } = useFetch({
    key,
    api: api + "/get-all",
    data,
  });
  const loginParam = userCtx && {
    user: userCtx.data.sa_user,
    password: userCtx.data.sa_pass,
  };
  const PopConfirmBtn = ({ rowData, title, icon, handleConfirm, color }) => (
    <Popconfirm
      title={`${title} - "${rowData.name}"?`}
      onConfirm={handleConfirm}
      okText="yes"
      cancelText="no"
    >
      <i style={{ cursor: "pointer", fontSize: 22, color }}>{icon}</i>
    </Popconfirm>
  );
  const handleDelete = (e) => console.log(e);
  const dataWithBtn =
    userCtx &&
    theData?.map((each) => {
      return {
        ...each,
        act: (
          <Row gutter={[8, 8]} justify="center" align="middle">
            {!each.stamp && (
              <Col>
                <PopConfirmBtn
                  {...{
                    title: "Are you sure you want to generate stamp",
                    rowData: each,
                    color: "magenta",
                    icon: <FileProtectOutlined />,
                    handleConfirm: () => {
                      handleGenerateStamp({ ...each, state, dispatch, loginParam }).then((r) => {
                        const {
                          id,
                          user_id,
                          name,
                          raw_doc,
                          stamp,
                          reference_doc,
                        } = r.data;
                        r.code === 201 &&
                          handleStampingDocument({ id,
                            user_id,
                            name,
                            raw_doc,
                            stamp,
                            reference_doc, state, dispatch, loginParam  });
                      });
                    },
                  }}
                />
              </Col>
            )}
            {each.stamp && !each.final_doc && (
              <Col>
                <PopConfirmBtn
                  {...{
                    title: "Are you sure you want to stamp the document",
                    rowData: each,
                    icon: <AuditOutlined />,
                    color: "orange",
                    handleConfirm: () => {
                      handleStampingDocument({ ...each, state, dispatch, loginParam });
                    },
                  }}
                />
              </Col>
            )}
            {false && (
              <Col>
                <PopConfirmBtn
                  {...{
                    title: "Are you sure you want to delete",
                    rowData: each,
                    icon: <DeleteOutlined />,
                    color: "indianred",
                    handleConfirm: () => handleDelete(each.id),
                  }}
                />
              </Col>
            )}
            {each.final_doc && (
              <CheckCircleTwoTone
                style={{ fontSize: 22 }}
                twoToneColor="#52c41a"
              />
            )}
          </Row>
        ),
      };
    });
  return {
    getAllData: dataWithBtn,
    getAllPagination: pagination,
    getAllError: res,
    getAllLoading: isLoading,
  };
}

export function postCreate(data) {
  const url = api + "/create-upload";
  let bodyFormData = new FormData();
  const headers = { "Content-Type": "multipart/form-data" };
  for (let key in data) {
    if (data.hasOwnProperty(key) && key !== "raw_doc") {
      bodyFormData.append(key, data[key]);
    } else if (data.hasOwnProperty(key) && key === "raw_doc") {
      data[key]?.map((each) => {
        bodyFormData.append("raw_doc", each.originFileObj, each.name);
      });
    }
  }
  return axiosPost(url, bodyFormData, headers);
}
