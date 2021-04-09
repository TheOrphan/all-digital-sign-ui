import useFetch from "utils/fetcher";

const api = "/logs";

export function getAll(key, data) {
  const { data: theData, pagination, res, isLoading } = useFetch({
    key,
    api: api + "/get-all",
    data,
  });
  return {
    getAllData: theData,
    getAllPagination: pagination,
    getAllError: res,
    getAllLoading: isLoading,
  };
}
