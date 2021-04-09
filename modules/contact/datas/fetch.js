import { ActBtn } from "components/col-act-btn";
import useFetch, { axiosPost } from "utils/fetcher";
import { updateFields } from "../fields";

const api = "/contacts";

export function getAll(key, body, options) {
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
            handleCreate: postUpdate,
            fields: updateFields,
          }}
          list={options?.list}
          id={each.id}
          dataOnPrompt={each.first_name + " " + each.last_name}
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

export function postCreate(data) {
  const url = api + "/create";
  return axiosPost(url, data);
}

export function postUpdate(data) {
  const url = api + "/update";
  return axiosPost(url, data);
}

export function postDelete(id) {
  const url = api + "/delete";
  return axiosPost(url, { id });
}
