import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import loadable from '@loadable/component';

const Login = loadable(() => import('@/containers/v1/login/login'));
const MentorList = loadable(
  () => import('@/containers/v1/mentor-list/mentor-list'),
);
const DataRoom = loadable(() => import('@/containers/v1/data-room/data-room'));
const MyMentoringMentor = loadable(
  () => import('@/containers/v1/my-mentoring-mentor/my-mentoring-mentor'),
);
const CadetMentoring = loadable(
  () => import('@/containers/v1/cadet-mentoring/cadet-mentoring'),
);
const SignUpMentor = loadable(
  () => import('@/containers/v1/signup/signup-mentor'),
);
const NotFound = loadable(() => import('@/containers/v1/not-found/not-found'));
const ReportForm = loadable(
  () => import('@/containers/v1/reports/report-form'),
);
const MainPage = loadable(() => import('@/containers/v1/main-page/main-page'));
const ApplyPage = loadable(
  () => import('@/containers/v1/apply-page/apply-page'),
);
const ReportDetail = loadable(
  () => import('@/containers/v1/report-detail/report-detail'),
);
const MentorDetail = loadable(
  () => import('@/containers/v1/mentor-detail/mentor-detail'),
);
const SignUpCadet = loadable(
  () => import('@/containers/v1/signup/signup-cadet'),
);

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
