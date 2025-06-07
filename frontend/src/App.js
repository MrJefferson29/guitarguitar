import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import PrivateRoute from './components/Routing/PrivateRoute';
import Shelter from "./components/GeneralScreens/Shelter"
import LoginScreen from "./components/AuthScreens/LoginScreen"
import RegisterScreen from "./components/AuthScreens/RegisterScreen"
import ForgotPasswordScreen from "./components/AuthScreens/ForgotPasswordScreen"
import ResetPasswordScreen from "./components/AuthScreens/ResetPasswordScreen"
import AddStory from './components/StoryScreens/AddStory';
import DetailStory from './components/StoryScreens/DetailStory';
import Header from './components/GeneralScreens/Header';
import Footer from './components/GeneralScreens/Footer';
import Profile from './components/ProfileScreens/Profile';
import EditProfile from './components/ProfileScreens/EditProfile';
import ChangePassword from './components/ProfileScreens/ChangePassword';
import NotFound from './components/GeneralScreens/NotFound';
import EditStory from './components/StoryScreens/EditStory';
import ReadListPage from './components/ProfileScreens/ReadListPage';
import Sc1 from './components/GeneralScreens/sc1';
import FAQ from './components/GeneralScreens/FAQ';
import Contact from './components/GeneralScreens/Contact';
import Health from './components/GeneralScreens/Health';
import Delivery from './components/GeneralScreens/Delivery';
import About from './components/GeneralScreens/About'
import PrivacyPolicy from './components/GeneralScreens/Privacy'


const App = () => {

  return (
    <Router>

      <div className="App">

        <Routes>
          <Route path="/" element={<LayoutsWithHeader />}>

            <Route path='*' element={<NotFound />} />

              <Route exact path='/' element={<Sc1 />} />

            <Route exact path="/story/:slug" element={<DetailStory />} />

            <Route exact path='/addstory' element={<PrivateRoute />}>
              <Route exact path='/addstory' element={<AddStory />} />
            </Route>

            <Route exact path='/profile' element={<PrivateRoute />}>
              <Route exact path='/profile' element={<Profile />} />
            </Route>

            <Route exact path='/edit_profile' element={<PrivateRoute />}>
              <Route exact path='/edit_profile' element={<EditProfile />} />
            </Route>

            <Route exact path='/change_Password' element={<PrivateRoute />}>
              <Route exact path='/change_Password' element={<ChangePassword />} />
            </Route>

            <Route exact path='/story/:slug/like' element={<PrivateRoute />}>
              <Route exact path='/story/:slug/like' element={<DetailStory />} />
            </Route>

            <Route exact path='/story/:slug/edit' element={<PrivateRoute />}>
              <Route exact path='/story/:slug/edit' element={<EditStory />} />
            </Route>

            <Route exact path='/story/:slug/delete' element={<PrivateRoute />}>
              <Route exact path='/story/:slug/delete' element={<DetailStory />} />
            </Route>
            <Route exact path='/story/:slug/addComment' element={<PrivateRoute />}>
              <Route exact path='/story/:slug/addComment' element={<DetailStory />} />
            </Route>

            <Route exact path='/readList' element={<PrivateRoute />}>
              <Route exact path='/readList' element={<ReadListPage />} />
            </Route>
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="about" element={<About />} />
            <Route path='health-guarantee' element={<Health />} />
            <Route path='delivery-options' element={<Delivery />} />
            <Route path='contact-us' element={<Contact />} />
            <Route path='purchase-process' element={<FAQ />} />
            <Route path="/store" element={<Shelter />} />

          </Route>

          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />

          <Route exact path="/forgotpassword" element={<ForgotPasswordScreen />} />

          <Route exact path="/resetpassword" element={<ResetPasswordScreen />} />


        </Routes>

      </div>

    </Router>

  );

}

const LayoutsWithHeader = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
