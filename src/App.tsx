import { Suspense } from 'react';
import { observer } from 'mobx-react-lite';

import ScrollToTop from '@/containers/scroll-to-top/scroll-to-top';
import LoadingStore from '@/states/loading/LoadingStore';
import UserJoinStore from '@/states/user-join/UserJoinStore';
import ErrorStore from '@/states/error/ErrorStore';
import { UserJoin } from '@/containers/user-join/user-join';
import { Error } from '@/containers/error/error';
import LoadingStore from '@/states/loading/LoadingStore';
import Footer from '@/components/v1/footer';
import Header from '@/components/v1/header/header';
import { Loading } from '@/components/v1/loading';
import UserJoinStore from '@/states/user-join/UserJoinStore';
import ErrorStore from '@/states/error/ErrorStore';
import loadable from '@loadable/component';
import { Suspense } from 'react';
import ScrollToTop from '@/containers/scroll-to-top/scroll-to-top';
import Routes from '@/src//Routes';

/*
 * <Route path='/경로' element={<컴포넌트 />}
 * ex) <Route path="*" element={<NotFound />} />
 *
 * {{BASE_URL}}/경로로 해당 컴포넌트 접근 가능
 */

const App = observer(() => {
  return (
    <>
      {LoadingStore.isLoding && <Loading />}
      {ErrorStore.isError && (
        <Error TitleText={ErrorStore.Title} errorMsg={ErrorStore.errorMsg} />
      )}
      {UserJoinStore.needJoin && <UserJoin />}
      <ScrollToTop />
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes />
      </Suspense>
      <Footer />
    </>
  );
});

export default App;
