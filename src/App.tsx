import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import Mainpage from './containers/mainpage/Mainpage';
import { useScroll } from './components/scrollevent';
import Applypage from './containers/cardetApply/Applypage';
import ReportDetail from './containers/reportDetail/ReportDetail';
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
          <Route path="mainpage" element={<Mainpage />}></Route>
          <Route path="applypage" element={<Applypage />}></Route>
          <Route path="reportdetails" element={<ReportDetail />}></Route>
        </Routes>
        <Header />
        {ScrollActive ? <Footer /> : ''}
      </Router>
    </>
  );
}

export default App;
