import columns from "./datas/columns";
import { useRouter } from "next/router";
import { getAll, postCreate } from "./datas/fetch";
import { default as DefaultPage } from "components/default-page";
import { createFields } from "./fields";

export default function IndexPage({ reqParam }) {
  const router = useRouter();
  const { page } = router.query;
  const { getAllData, getAllLoading, getAllPagination } = getAll(
    reqParam?.key || router.asPath,
    {
      page,
      ...reqParam?.body,
    },
    reqParam?.options
  );
  const asCommon = reqParam && {
    rowSelection: {
      type: "radio",
      onSelect: (record) =>
        reqParam?.dispatchModal({ type: "SELECTED_ROW", rowValue: record }),
    },
  };
  return (
    <DefaultPage
      title="Company List"
      modalAddProps={{
        title: "company",
        handleCreate: (values) => postCreate(values),
        data: getAllData,
        fields: createFields,
        initialValues: { type: "company" },
      }}
      pageProps={{
        current: page,
        total: getAllPagination?.totalContent,
        hideOnSinglePage: true,
      }}
      tableProps={{
        ...asCommon,
        rowClassName: asCommon && "pointer",
        style: { marginTop: "1rem" },
        bordered: true,
        columns: columns(reqParam || false),
        loading: getAllLoading,
        dataSource: getAllData,
      }}
      separatePagination={reqParam ? false : true}
    />
  );
}
