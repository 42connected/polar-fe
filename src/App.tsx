import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DataRoom from './containers/data-room/data-room';
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

/*
 * <Route path='/경로' element={<컴포넌트 />}
 * ex) <Route path="*" element={<NotFound />} />
 *
 * {{BASE_URL}}/경로로 해당 컴포넌트 접근 가능
 */

const App = observer(() => {
  return (
    <>
      {LoadingStore.isLoding ? <Loading /> : null}
      <Router basename={'/'}>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/data-room" element={<DataRoom />} />
          <Route path="/mentor-lists/:category" element={<MentorList />} />
          <Route
            path="/mentorings/reports/:reportId"
            element={<ReportForm />}
          />
          <Route
            path="/mentors/mentorings/:intraId"
            element={<MyMentoringMentor />}
          />
          <Route path="" element={<MainPage />} />
          <Route path="login" element={<Login />} />
          <Route path="apply-page" element={<ApplyPage />} />
          <Route path="report-details/:intraId" element={<ReportDetail />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/mentor-detail/:intraId" element={<MentorDetail />} />
          <Route path="/mentors/join" element={<SignUpMentor />} />
          <Route path="/cadets/join" element={<SignUpCadet />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
});

export default App;
