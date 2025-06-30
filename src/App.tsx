import './App.css';
import Navbar from './navbar';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/footer';
import AdminDashboardLayout from './components/AdminDashboard';
import Events from './components/AdminDashboard/Events';
import PresidentMessage from './components/AdminDashboard/President-Message';
import Dashboard from './components/AdminDashboard/dashboard';
import ProjectsDashboard from './components/AdminDashboard/Projects';
import NewsDashboard from './components/AdminDashboard/News';
import ContactUsDashboard from './components/AdminDashboard/contact';
import BannersDashboard from './components/AdminDashboard/banner';
import TeamDashboard from './components/AdminDashboard/Team';
import BoardMembersDashboard from './components/AdminDashboard/BoardMembers';
import NewsSection from './components/News';
import { Contact } from './components/Contactus';
import AboutusIntroduction from './components/Aboutus/introduction';
import Visionandmission from './components/Aboutus/visionmision';
import ByLaws from './components/Aboutus/bylaws';
import GalleryMediaSection from './components/media/gallery';
import VideoGallery from './components/media/video';
import Registration from './components/Registration';
import LoginPage from './components/Login';
import UsersDashboard from './components/AdminDashboard/users';
import AdminLogin from './components/AdminLogin';
import Donations from './components/Donations';
import OperationalGuidelines from './components/Aboutus/operationalGuidelines';
import PresidentMessageMain from './components/Leadership/presidentmessage';
import MembersBoardMain from './components/Leadership/membersboard';
import BoardCategoriesDashboard from './components/AdminDashboard/BoardCategory';
import ChapterList from './components/chapters';
import CreateChaptersDashboard from './components/AdminDashboard/createchapters';
import CreateChapterLeadsDashboard from './components/AdminDashboard/createchapterleads';
import { ChapterDetail } from './components/chapters/chapter';
import CreateChapterDirectorsDashboard from './components/AdminDashboard/createchapterdirectors';
import { EventDetailPage } from './components/Home/eventDetail';
import ProjectDetailPage from './components/Projects/projectDetailedPage';
import ProjectListPage from './components/Projects/projectListPage';
import GalleryDashboard from './components/AdminDashboard/gallery';
import AboutPageDashboard from './components/AdminDashboard/Webpages';
import HomepageDashboard from './components/AdminDashboard/HomePage';

function App() {
  const location = useLocation();

  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Conditionally render Navbar */}
      {!isAdminPath && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/news" element={<NewsSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/introduction' element={<AboutusIntroduction />} />
        <Route path='/vision-missions' element={<Visionandmission />} />
        <Route path='/by-laws' element={<ByLaws />} />
        <Route path='/operationalguidelines' element={<OperationalGuidelines />} />
        <Route path='/gallery' element={<GalleryMediaSection />} />
        <Route path='/video-gallery' element={<VideoGallery />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/donations' element={<Donations />} />
        <Route path='/president-message' element={<PresidentMessageMain />} />
        <Route path='/members-board' element={<MembersBoardMain />} />
        <Route path='/chapters' element={<ChapterList />} />
        <Route path="/chapter/:id" element={<ChapterDetail />} />
        <Route path="/event/:id" element={<EventDetailPage />} />
        <Route path='/project/:id' element={<ProjectDetailPage />} />



        <Route
          path="/admin"
          element={
            <AdminDashboardLayout>

              <Dashboard />
            </AdminDashboardLayout>
          }
        />
        <Route path='/admin/events' element={<Events />} />
        <Route path='/admin/projects' element={<ProjectsDashboard />} />
        <Route path='/admin/news' element={<NewsDashboard />} />
        <Route path='/admin/contact' element={<ContactUsDashboard />} />
        <Route path='/admin/banner-carousels' element={<BannersDashboard />} />
        <Route path='/admin/president-message' element={<PresidentMessage />} />
        <Route path='/admin/our-team' element={<TeamDashboard />} />
        <Route path='/admin/board-category' element={<BoardCategoriesDashboard />} />
        <Route path='/admin/members-board' element={<BoardMembersDashboard />} />
        <Route path='/admin/special-committees' element={<TeamDashboard />} />
        <Route path='/admin/users' element={<UsersDashboard />} />
        <Route path='/admin/create-chapters' element={<CreateChaptersDashboard />} />
        <Route path='/admin/create-chapterleads' element={<CreateChapterLeadsDashboard />} />
        <Route path='/admin/create-chapterdirectors' element={<CreateChapterDirectorsDashboard />} />
        <Route path='/admin/gallery' element={<GalleryDashboard />} />

        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin/about-introduction' element={<AboutPageDashboard />} />
        <Route path='/admin/home-page' element={<HomepageDashboard />} />

      </Routes >

      {!isAdminPath && <Footer />
      }
    </>
  );
}

export default function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
