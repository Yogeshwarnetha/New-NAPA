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
import Projects from './components/Projects';
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

function App() {
  const location = useLocation();

  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Conditionally render Navbar */}
      {!isAdminPath && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/news" element={<NewsSection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/introduction' element={<AboutusIntroduction />} />
        <Route path='/vision-missions' element={<Visionandmission/>} />
        <Route path='/by-laws' element={<ByLaws/>}/>
        <Route path='/gallery' element={<GalleryMediaSection/>} />
        <Route path='/video-gallery' element={<VideoGallery/>} />
        <Route path='/register' element={<Registration/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/donations' element={<Donations/>} />


        <Route
          path="/admin"
          element={
            <AdminDashboardLayout>
              
              <Dashboard/>
            </AdminDashboardLayout>
          }
        />
        <Route path='/admin/events' element={<Events/>}/>
        <Route path='/admin/projects' element={<ProjectsDashboard/>}/>
        <Route path='/admin/news' element={<NewsDashboard/>}/>
        <Route path='/admin/contact' element={<ContactUsDashboard/>}/>
        <Route path='/admin/banner-carousels' element={<BannersDashboard/>}/>
        <Route path='/admin/president-message' element={<PresidentMessage/>}/>
        <Route path='/admin/our-team' element={<TeamDashboard/>}/>
        <Route path='/admin/members-board' element={<BoardMembersDashboard/>}/>
        <Route path='/admin/special-committees' element={<TeamDashboard/>}/>
        <Route path='/admin/users' element={<UsersDashboard/>}/>

        <Route path='/admin/login' element={<AdminLogin/>}/>


      </Routes>

      {!isAdminPath && <Footer />}
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
