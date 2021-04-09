import columns from "./datas/columns";
import { useRouter } from "next/router";
import { getAll, postCreate } from "./datas/fetch";
import { default as DefaultPage } from "components/default-page";
import { createFields } from "./fields";
import { useEffect, useReducer } from "react";
import repositoryReducer from "./reducer";
import { notification, Progress } from "antd";

export default function IndexPage({ user }) {
  const [state, dispatch] = useReducer(repositoryReducer,{ step: 0, msg: '', statusDone: false });

  const router = useRouter();
  const { page } = router.query;
  const { getAllData, getAllLoading, getAllPagination } = getAll(
    router.asPath,
    {
      page,
    },
    user,
    state, dispatch
  );

  useEffect(() => {
    if(state.step > 0 && !state.statusDone){
      openNotification(state.key, state.step, state.msg);
    }
    console.log('status',state.statusDone);
    if(state.statusDone){
      setTimeout(() => {
        notification.destroy()
       }, 2000);
      dispatch({type:'PROGRESS_INIT'})
    }
  }, [state.step, state.statusDone]);

  const openNotification = (key, step, msg) => {
    const maxStep = 6
    notification.open({
      key,
      message: "Stamping on progress",
      duration: 0,
      placement: "bottomLeft",
      description: (
        <div>
          <p>Do not interrupts / close this tab!</p>
          <p>{msg}</p>
          <Progress percent={Math.floor(step/maxStep*100)} steps={maxStep} />
        </div>
      )
    });
  }
  return user?.data ? (
    <div>
      {state.step > 0 && !state.statusDone && <div style={{ height:'100vh', top: 0, left: 0, width: '100vw', position: 'fixed', zIndex: 1009, background: 'rgba(0,0,0, .8 )' }} /> }
    <DefaultPage
      title="Repository"
      modalAddProps={{
        title: "files(s)",
        handleCreate: (values) => postCreate(values),
        data: getAllData,
        fields: createFields,
        initialValues: { quota: 0, user_id: user.data.id },
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
  ) : null;
}
