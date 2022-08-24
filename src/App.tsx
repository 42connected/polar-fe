import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MentorList from './containers/mentor-list/mentor-list';
import ReportForm from './containers/reports/report-form';

/*
 * <Route path='/경로' element={<컴포넌트 />}
 * ex) <Route path="*" element={<NotFound />} />
 *
 * {{BASE_URL}}/경로로 해당 컴포넌트 접근 가능
 */
function App() {
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
