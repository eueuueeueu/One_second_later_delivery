import { PageContainer } from '@ant-design/pro-components';
import { Navigate } from '@umijs/max';
import Cookies from 'js-cookie';
const HomePage: React.FC = () => {
  // 如果还未登录，则直接跳转到登录页
  if (!Cookies.get('token')) {
    return <Navigate to="/Authorization" />;
  }
  // const count = useAppSelector((state) => state.count);
  // const dispatch = useAppDispatch();
  // const { name } = useModel('global');
  // const [messageApi, contextHolder] = message.useMessage();
  // return (
  //   <PageContainer ghost>
  //     {contextHolder}
  //     <div className={styles.container}>
  //       <h1 onClick={() => dispatch({ type: 'INCREASE' })}>count:{count}</h1>
  //       <Guide name={trim(name)} />
  //     </div>
  //     <Button
  //       onClick={() =>
  //         messageApi.open({ type: 'success', content: 'success message' })
  //       }
  //     >
  //       open success message
  //     </Button>
  //   </PageContainer>
  // );
  return <PageContainer></PageContainer>;
};

export default HomePage;
