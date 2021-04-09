import { ActBtn } from "components/col-act-btn";
import useFetch, { axiosPost } from "utils/fetcher";
import { updateFields } from "../fields";

const api = "/settings";

export function getAll(key, body, options) {
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
            title: "setting",
            records: each,
            handleCreate: postUpdate,
            fields: updateFields,
          }}
          list={options?.list}
          id={each.id}
          dataOnPrompt={each.first_name + " " + each.last_name}
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

export function postUpdate(data) {
  const url = api + "/update";
  return axiosPost(url, data);
}
