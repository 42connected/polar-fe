import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MentorList from './containers/mentor-list/mentor-list';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
