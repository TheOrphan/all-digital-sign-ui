import { ActBtn } from "components/col-act-btn";
import useFetch, { axiosPost } from "utils/fetcher";
import { updateFields } from "../fields";
import { useRouter } from "next/router";
import { mutate } from "swr";

const api = "/users-groups";

export function getAll(key, body, options) {
  const router = useRouter();
  const { data, pagination, res, isLoading } = useFetch({
    key,
    api: api + "/get-all",
    body,
  });
  const dataWithBtn = data?.map((each) => {
    return {
      ...each,
      act: (
        <ActBtn
          modalUpdateProps={{
            title: "users groups",
            records: each,
            handleCreate: (value) => postUpdate(router.asPath, value),
            fields: updateFields,
          }}
          list={options?.list}
          id={each.id}
          dataOnPrompt={
            each?.user_id?.contact_id?.first_name +
            " " +
            each?.user_id?.contact_id?.last_name +
            " (" +
            each?.group_id?.name +
            ") "
          }
          handleDelete={postDelete}
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

export function postCreate(key, data) {
  const url = api + "/create";
  return axiosPost(url, {
    group_id: data.group_id.group,
    user_id: data.user_id.user,
  }).then((response) => {
    mutate(key);
    return response;
  });
}

export function postUpdate(key, data) {
  const url = api + "/update";
  return axiosPost(url, {
    id: data.id,
    group_id: data.group_id.group,
    user_id: data.user_id.user,
  }).then((response) => {
    mutate(key);
    return response;
  });
}

export function postDelete(id) {
  const url = api + "/delete";
  return axiosPost(url, { id });
}

export function getUsers() {
  const { data, isLoading } = useFetch({
    key: "user-get-all",
    api: "/users/get-all",
    data: { page: "all" },
  });
  return {
    getUserData: data,
    getUserLoading: isLoading,
  };
}

export function getGroups() {
  const { data, isLoading } = useFetch({
    key: "group-get-all",
    api: "/groups/get-all",
    data: { page: "all" },
  });
  return {
    getGroupData: data,
    getGroupLoading: isLoading,
  };
}
