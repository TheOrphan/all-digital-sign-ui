import { ActBtn } from "components/col-act-btn";
import useFetch, { axiosPost } from "utils/fetcher";

export function getAll(key, body = {}) {
  const { data, pagination, res, isLoading } = useFetch({
    key,
    api: "/repositories/dashboard",
    body,
  });
  return {
    getAllData: data,
    getAllPagination: pagination,
    getAllError: res,
    getAllLoading: isLoading,
  };
}
