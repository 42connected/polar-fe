import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loading } from './components/loading';
import MentorList from './containers/mentor-list/mentor-list';
import MyMentoringMentor from './containers/my-mentoring-mentor/my-mentoring-mentor';
import NotFound from './containers/not-found/not-found';
import ReportForm from './containers/reports/report-form';
import LoadingStore from './states/loading/LoadingStore';
import Footer from './components/footer';
import Header from './components/header';
import Mainpage from './containers/mainpages/mainpage';
import Applypage from './containers/cardetApplys/applypage';
import ReportDetail from './containers/reportDetails/reportDetail';
import MentorDetail from './containers/mentor-detail/mentor-detail';
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
          /* * ADD <Route /> here */
          <Route path="/mentor-lists/:category" element={<MentorList />} />
          <Route
            path="/mentorings/reports/:reportId"
            element={<ReportForm />}
          />
          <Route
            path="/mentors/mentorings/:intraId"
            element={<MyMentoringMentor />}
          />
          <Route path="" element={<Mainpage />}></Route>
          <Route path="applypage" element={<Applypage />}></Route>
          <Route path="reportdetails" element={<ReportDetail />}></Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/mentor-detail/:intraId" element={<MentorDetail />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
});

export default App;
