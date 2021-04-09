import columns from "./datas/columns";
import { useRouter } from "next/router";
import { getAll } from "./datas/fetch";
import { default as DefaultPage } from "components/default-page";

export default function IndexPage() {
  const router = useRouter();
  const { page } = router.query;
  const { getAllData, getAllLoading, getAllPagination } = getAll(
    router.asPath,
    {
      page,
    },
    { list: ["update"] }
  );
  return (
    <DefaultPage
      title="Setting List"
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
