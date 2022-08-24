import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MentorList from './containers/mentor-list/mentor-list';
import MyMentoringMentor from './containers/my-mentoring-mentor/my-mentoring-mentor';
import NotFound from './containers/not-found/not-found';
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
          <Route
            path="/mentors/mentorings/:intraId"
            element={<MyMentoringMentor />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
