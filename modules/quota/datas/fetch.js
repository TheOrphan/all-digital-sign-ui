import { ActBtn } from "components/col-act-btn";
import useFetch, { axiosPost } from "utils/fetcher";
import { updateFields } from "../fields";
import { mutate } from "swr";
import { useRouter } from "next/router";

const api = "/quotas";

export function getAll(key, body, options) {
  const router = useRouter();
  const { data, pagination, res, isLoading } = useFetch({
    key,
    api: api + "/get-all",
    data: body,
  });
  const dataWithBtn = data?.map((each) => {
    return {
      ...each,
      act: (
        <ActBtn
          modalUpdateProps={{
            title: "contact",
            records: each,
            handleCreate: (value) => postUpdate(router.asPath, value),
            fields: updateFields,
          }}
          list={options?.list}
          id={each.id}
          dataOnPrompt={
            each.contact_id.first_name + " " + each.contact_id.last_name
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
  return axiosPost(url, data).then((res) => {
    mutate(key);
    return res;
  });
}

export function postUpdate(key, data) {
  const url = api + "/update";
  return axiosPost(url, data).then((res) => {
    mutate(key);
    return res;
  });
}

export function postDelete(id) {
  const url = api + "/delete";
  return axiosPost(url, { id });
}
