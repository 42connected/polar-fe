import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MentorDetail from './contaners/metor-detail';

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
        <Routes >
          <Route path='/mentor-detail/:intraId' element={<MentorDetail/>} />
          /* * ADD <Route /> here */
        </Routes>
      </Router>
    </>
  );
}

export default App;
