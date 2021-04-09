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
    <div>
      <DefaultPage
        title="Users List"
        modalAddProps={{
          title: "Users",
          handleCreate: (values) => postCreate(values),
          data: getAllData,
          fields: createFields,
          initialValues: { active: 1, quota_limit: 0, password: "12345678" },
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
    </div>
  );
}
