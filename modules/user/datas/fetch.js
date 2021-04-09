import { notification } from "antd";
import useFetch, { axiosPost } from "utils/fetcher";
import UserActBtn from "../components/btn-act";

const api = "/users";

export function getAll(key, body) {
  const { data, pagination, res, isLoading } = useFetch({
    key,
    api: api + "/get-all",
    body,
  });
  const dataWithBtn = data?.map((each) => {
    return {
      ...each,
      act: (
        <UserActBtn
          {...{
            deactivateProps: {
              dataOnPrompt: each.email,
              handleConfirm: () => postDeactivate(each),
            },
            editProps: {
              initialValues: each,
              handleSubmit: postUpdate,
            },
            chgPassProps: {
              initialValues: each,
              handleSubmit: postUpdate,
            },
            quotaProps: {
              initialValues: each,
              handleSubmit: postUpdate,
            },
          }}
        />
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
  const { email } = data;
  data = { ...data, email: email.toLowerCase() };
  const url = api + "/create";
  return axiosPost(url, data);
}

function postUpdate(data) {
  const url = api + "/update";
  return axiosPost(url, data).then(
    (response) =>
      response.code === 201 &&
      notification.warning({
        message: "re·mind·er!",
        description:
          "If you updated your own account, you'll need to re-login for your changes to take effect",
        placement: "bottomRight",
      })
  );
}

function postDeactivate(data) {
  const req = { active: 0, id: data.id };
  const url = api + "/update";
  return axiosPost(url, req);
}
