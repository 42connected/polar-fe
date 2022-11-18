import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from '@/containers/login/login';
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

/*
 * <Route path='/경로' element={<컴포넌트 />}
 * ex) <Route path="*" element={<NotFound />} />
 *
 * {{BASE_URL}}/경로로 해당 컴포넌트 접근 가능
 */

const MentorList = loadable(
  () => import('./containers/mentor-list/mentor-list'),
);
const DataRoom = loadable(() => import('./containers/data-room/data-room'));
const MyMentoringMentor = loadable(
  () => import('./containers/my-mentoring-mentor/my-mentoring-mentor'),
);
const CadetMentornig = loadable(
  () => import('./containers/cadet-mentoring/cadet-mentoring'),
);
const SignUpMentor = loadable(
  () => import('./containers/signup/signup-mentor'),
);
const NotFound = loadable(() => import('./containers/not-found/not-found'));
const ReportForm = loadable(() => import('./containers/reports/report-form'));
const MainPage = loadable(() => import('./containers/main-page/main-page'));
const ApplyPage = loadable(() => import('./containers/apply-page/apply-page'));
const ReportDetail = loadable(
  () => import('./containers/report-detail/report-detail'),
);
const MentorDetail = loadable(
  () => import('./containers/mentor-detail/mentor-detail'),
);
const SignUpCadet = loadable(() => import('./containers/signup/signup-cadet'));

const App = observer(() => {
  return (
    <>
      {LoadingStore.isLoding && <Loading />}
      <Router basename={'/'}>
        {ErrorStore.isError && (
          <Error TitleText={ErrorStore.Title} errorMsg={ErrorStore.errorMsg} />
        )}
        {UserJoinStore.needJoin && <UserJoin />}
        <ScrollToTop />
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/data-room" element={<DataRoom />} />
            <Route path="/cadets/mentorings" element={<CadetMentornig />} />
            <Route path="/mentor-lists/:category" element={<MentorList />} />
            <Route
              path="/mentorings/reports/:reportId"
              element={<ReportForm />}
            />
            <Route
              path="/mentors/mentorings/:intraId"
              element={<MyMentoringMentor />}
            />
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/apply-page/:mentorId" element={<ApplyPage />} />
            <Route path="/report-detail" element={<ReportDetail />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/mentor-detail/:intraId" element={<MentorDetail />} />
            <Route path="/mentors/join" element={<SignUpMentor />} />
            <Route path="/cadets/join" element={<SignUpCadet />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </>
  );
});

export default App;
