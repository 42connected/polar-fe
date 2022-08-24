import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import Mainpage from './containers/mainpages/mainpage';
import { useScroll } from './components/scrollevent';
import Applypage from './containers/cardetApplys/applypage';
import ReportDetail from './containers/reportDetails/reportDetail';
import MentorList from './containers/mentor-lists/mentor-list';
import ReportForm from './containers/reports/report-form';

/*
 * <Route path='/경로' element={<컴포넌트 />}
 * ex) <Route path="*" element={<NotFound />} />
 *
 * {{BASE_URL}}/경로로 해당 컴포넌트 접근 가능
 */
function App() {
  const { ScrollActive } = useScroll();
  return (
    <>
      <Router basename={'/'}>
        <Routes>
          /* * ADD <Route /> here */
          <Route path="/mentor-lists/:category" element={<MentorList />} />
          <Route
            path="/mentorings/reports/:reportId"
            element={<ReportForm />}
          />
          <Route path="" element={<Mainpage />}></Route>
          <Route path="applypage" element={<Applypage />}></Route>
          <Route path="reportdetails" element={<ReportDetail />}></Route>
        </Routes>
        <Header />
        <Footer />
      </Router>
    </>
  );
}

export default App;
