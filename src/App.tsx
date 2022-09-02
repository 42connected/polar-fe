import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataRoom from './containers/data-room/data-room';
import CadetMentornig from './containers/cadet-mentoring/cadet-mentoring';
import MentorList from './containers/mentor-list/mentor-list';
import SignUpMentor from './containers/signup/signup-mentor';
import MyMentoringMentor from './containers/my-mentoring-mentor/my-mentoring-mentor';
import NotFound from './containers/not-found/not-found';
import ReportForm from './containers/reports/report-form';
import LoadingStore from './states/loading/LoadingStore';
import Footer from './components/footer';
import Header from './components/header';
import MainPage from './containers/main-page/main-page';
import ApplyPage from './containers/apply-page/apply-page';
import ReportDetail from './containers/report-detail/report-detail';
import MentorDetail from './containers/mentor-detail/mentor-detail';
import { Loading } from './components/loading';
import { Login } from './containers/login/login';
import SignUpCadet from './containers/signup/signup-cadet';
import ScrollToTop from './containers/scroll-to-top/scroll-to-top';
import UserJoinStore from './states/user-join/UserJoinStore';
import { UserJoin } from './containers/user-join/user-join';
import ErrorStore from './states/error/ErrorStore';
import { Error } from './containers/error/error';
import MentorInfoModal, {
  ModalType,
} from './containers/signup/mentor-info-modal';

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
      <Router basename={'/'}>
        {ErrorStore.isError && (
          <Error TitleText={ErrorStore.Title} errorMsg={ErrorStore.errorMsg} />
        )}
        {UserJoinStore.needJoin && <UserJoin />}
        <ScrollToTop />
        <Header />
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
          {/* 모달 테스트용 URL -> 추후 멘토 상세페이지에 붙일 예정 */}
          <Route
            path="/mentors/info"
            element={
              <MentorInfoModal
                intraId="m-engeng"
                modalType={ModalType.MENTOR_INFO}
              />
            }
          />
          <Route
            path="/mentors/time"
            element={
              <MentorInfoModal
                intraId="m-engeng"
                modalType={ModalType.AVAILABLE_TIME}
              />
            }
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
});

export default App;
