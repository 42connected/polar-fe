import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import loadable from '@loadable/component';

// import Login from './containers/login/login';

const Login = loadable(() => import('./containers/login/login'));
const MentorList = loadable(
  () => import('./containers/mentor-list/mentor-list'),
);
const DataRoom = loadable(() => import('./containers/data-room/data-room'));
const MyMentoringMentor = loadable(
  () => import('./containers/my-mentoring-mentor/my-mentoring-mentor'),
);
const CadetMentoring = loadable(
  () => import('./containers/cadet-mentoring/cadet-mentoring'),
);
const SignUpMentor = loadable(
  () => import('./containers/signup/signup-mentor'),
);
const NotFound = loadable(() => import('./containers/not-found/not-found'));
const ReportForm = loadable(() => import('./containers/reports/report-form'));
const MainPage = loadable(() => import('./containers/main-page/main-page'));
const ApplyPage = loadable(() => import('./containers/apply-page/apply-page'));
const ReportDetail = loadable(
  () => import('./containers/report-detail/report-detail'),
);
const MentorDetail = loadable(
  () => import('./containers/mentor-detail/mentor-detail'),
);
const SignUpCadet = loadable(() => import('./containers/signup/signup-cadet'));

function Routes() {
  return (
    <ReactRouterRoutes>
      <Route path="/data-room" element={<DataRoom />} />
      <Route path="/cadets/mentorings" element={<CadetMentoring />} />
      <Route path="/mentor-lists/:category" element={<MentorList />} />
      <Route path="/mentorings/reports/:reportId" element={<ReportForm />} />
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
    </ReactRouterRoutes>
  );
}

export default Routes;
