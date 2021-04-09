import columns from "./datas/columns";
import { useRouter } from "next/router";
import { getAll, postCreate } from "./datas/fetch";
import { default as DefaultPage } from "components/default-page";
import { createFields } from "./fields";

export default function IndexPage() {
  const router = useRouter();
  const { page } = router.query;
  const { getAllData, getAllLoading, getAllPagination } = getAll(
    router.asPath,
    {
      page,
    }
  );
  return (
    <DefaultPage
      title="Quota List"
      modalAddProps={{
        title: "quota",
        handleCreate: (values) => postCreate(router.asPath, values),
        data: getAllData,
        fields: createFields,
        initialValues: { quota: 0 },
      }}
      pageProps={{
        current: page,
        total: getAllPagination?.totalContent,
        hideOnSinglePage: true,
      }}
      tableProps={{
        style: { marginTop: "1rem" },
        bordered: true,
        columns: columns,
        loading: getAllLoading,
        dataSource: getAllData,
      }}
    />
  );
}
