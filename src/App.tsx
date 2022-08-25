import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MentorList from './containers/mentor-list/mentor-list';
import SignUpCadet from './containers/signup/signup-cadet';
import SignUpMentor from './containers/signup/signup-mentor';

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
          <Route path="/mentor-lists/:category" element={<MentorList />} />
          <Route path="/signup-cadet" element={<SignUpCadet />} />
          <Route path="/signup-mentor" element={<SignUpMentor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
