import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Pages/AboutUs";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Conatact from "./Pages/ContactUs";
import Header from "./components/Header";
import Dashboard from "./Pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./Pages/CreatePost";
import UpdatePost from "./Pages/UpdatePost";
import PostPage from "./Pages/PostPage";
import Event from "./Pages/Eventspage";
import Clubs from "./Pages/Clubspage";
import StartClubPage from "./components/StartClubPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InviteFriends from "./components/InviteFriends";
import CreateClubForm from "./components/CreateClubForm";
import ScrollToTop from "./components/ScrollToTop";
import AcademicClubsPage from "./Pages/AcademicClubsPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import CreativeClubsPage from "./Pages/CreativeClubsPage";
import SocialClubsPage from "./Pages/SocialClubsPage";
import CulturalClubsPage from "./Pages/CulturalClubsPage";
import SpiritualClubsPage from "./Pages/SpiritualClubsPage";
import SportsClubsPage from "./Pages/SportsClubsPage";
import MembershipForm from "./components/MembershipForm";
import DashChat from "./components/DashChat";
import ChatList from "./components/ChatList";
import SingleClubPage from "./Pages/SingleClubPage";
import LostFoundPage from "./Pages/Lostfoundpage";
import LostFoundForm from "./components/LostFoundForm";
import LostItemsPage from "./Pages/LostItemsPage";
import FoundItemsPage from "./Pages/FoundItemsPage";
import EditPost from "./Pages/EditPost";
import CreateAnnouncementForm from "./Pages/CreateAnnouncementForm";
import Announcement from "../../Back/src/model/announcement";
import Announcements from "./Pages/Announcements";


const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/contact" element={<Conatact />} />
        <Route path="/events" element={<Event />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/lostfound" element={<LostFoundPage />} />
        <Route path="/lostfoundform" element={<LostFoundForm />} />
        <Route path="/lostitems" element={<LostItemsPage />} />
        <Route path="/founditems" element={<FoundItemsPage />} />
        <Route path="/one-club/:id" element={<SingleClubPage />} />
        <Route path="/start-club" element={<StartClubPage />} />
        <Route path="/create-club" element={<CreateClubForm />} />
        <Route path="/academic-clubs" element={<AcademicClubsPage />} />
        <Route path="/creative-clubs" element={<CreativeClubsPage />} />
        <Route path="/social-clubs" element={<SocialClubsPage />} />
        <Route path="/cultural-clubs" element={<CulturalClubsPage />} />
        <Route path="/spiritual-clubs" element={<SpiritualClubsPage />} />
        <Route path="/sports-clubs" element={<SportsClubsPage />} />
        <Route path="/membership-form" element={<MembershipForm />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
          <Route
            path="/dashboard/chat/:conversationId"
            element={<DashChat />}
          />
          <Route path="/dashboard/messages" element={<ChatList />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/create-announcement" element={<CreateAnnouncementForm />} />
          <Route path="/announcements" element={<Announcements/>}/>
        </Route>
        <Route path="/post/:postSlug" element={<PostPage />} />
        <Route path="/dashboard?tab=invite" element={<InviteFriends />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
