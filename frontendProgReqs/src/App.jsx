//import "./App.css";
import { useState, useEffect, useRef } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Email from "./components/Email";
import PasswordReset from "./components/Password/PasswordReset";
import PasswordResetRequest from "./components/Password/PasswordResetRequest";
import PasswordResetMessage from "./components/Password/PasswordResetMessage";
import RegisterMessage from "./components/Register/RegisterMessage";
import PersistentUser from "./components/PersistentUser";
import RequireAuth from "./components/RequireAuth";
import ProjectsList from "./pages/Projects/ProjectsList";
import ProjectForm from "./pages/Projects/Project";
import Projects from "./pages/ProjectInfo/Projects";
import Requirements from "./pages/Requirements/Requirements";
import ManageQuestionnaire from "./pages/Questionnaire/ManageQuestionnaire";
import Questionnaire from "./pages/Questionnaire/Questionnaire";
import Categories from "./pages/Categories/Categories";
import Subsections from "./pages/Practice/Practice";
import Questions from "./pages/Questions/Questions";
import Categoriesecurity from "./pages/CategorieSecurity/Categoriesecurity";
import Subcategories from "./pages/SubcategorieSecurity/Subcategories";
import RequirementSecurity from "./pages/RequirementSecurity/RequirementSecurity";
import Response from "./components/Response";
import ListResponses from "./pages/ListResponses/ListResponses";
import GraphicsResults from "./components/GraphicsResults";
import SelectReq from "./components/SelectReq";
import NotFoundError from "./components/Error/NotFoundError";
import Unauthorized from "./components/Error/Unauthorized";
import Container from "./components/ContainerEle";
import Footer from "./components/Home/Footer";
import useAuth from "./hooks/useAuth";
import useLogout from "./hooks/useLogout";

function App() {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const [userRegistered, setUserRegistered] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [PassRMessage, setPassRMessage] = useState(false);
  const inactivityTimeoutRef = useRef(null);

  const handelUserLoggedIn = () => {
    setUserLoggedIn(true);
  };

  const signOut = async () => {
    await logout();
    handleLogout();
    navigate("/login");
  }

  const handleLogout = () => {
    setUserLoggedIn(false);
  };

  const handleSuccessfulRegistration = () => {
    setUserRegistered(true);
  };

  const handleSuccessfulReset = () => {
    setPassRMessage(true);
  };

  useEffect(() => {
    if (auth?.accessToken) {
      handelUserLoggedIn();
    } else {
      handleLogout();
    }
  }, [auth]);

  useEffect(() => {
    console.log(`accessToken APP : ${auth?.accessToken}`);
    console.log(`userLoggedIn APP : ${userLoggedIn}`);
    const resetInactivity = () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
      if (userLoggedIn) {
        inactivityTimeoutRef.current = setTimeout(() => {
          signOut();
        }, 300000); // 1 minute in milliseconds
      }
    };

    if (userLoggedIn) {
      window.addEventListener("mousemove", resetInactivity);
      window.addEventListener("mousedown", resetInactivity);
      window.addEventListener("keypress", resetInactivity);
      window.addEventListener("scroll", resetInactivity);
      window.addEventListener("touchstart", resetInactivity);
      resetInactivity();
    } else {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
        inactivityTimeoutRef.current = null;
      }
      window.removeEventListener("mousemove", resetInactivity);
      window.removeEventListener("mousedown", resetInactivity);
      window.removeEventListener("keypress", resetInactivity);
      window.removeEventListener("scroll", resetInactivity);
      window.removeEventListener("touchstart", resetInactivity);
    }
  }, [
    userLoggedIn,
    handleLogout,
    navigate,
    inactivityTimeoutRef,
    signOut,
    auth,
  ]);

  return (
    <>
      { userLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        

        <Route element={<PersistentUser />}>
        <Route path="/unauthorized" element={<Unauthorized />} />
          <Route 
          path="/" element={
            userLoggedIn ? (
              <Navigate to="/listsprojects" replace />
            ) : (
              <Home />
            )
          } />
         
          <Route path="/confirm/:confirmationToken" element={<Email />} />

          <Route
            path="login"
            element={
              userLoggedIn ? (
              <Navigate to="/listsprojects" replace />
            ) : (  
            <Login 
            />
            )
          }
          />
          <Route
            path="register"
            element={
              userLoggedIn ? (
                <Navigate to="/listsprojects" replace />
              ) : (
                <Register
                  onSuccessRegistration={handleSuccessfulRegistration}
                />
              )
            }
          />
          <Route
            path="/reset-password/:resetToken"
            element={<PasswordReset onSuccessReset={handleSuccessfulReset} />}
          />
          <Route
            path="/request-password-reset"
            element={<PasswordResetRequest />}
          />
          {PassRMessage && (
            <Route
              path="/passmesage"
              element={PassRMessage ? <PasswordResetMessage /> : navigate("/")}
            />
          )}
          {userRegistered && (
            <Route
              path="/registermessage"
              element={userRegistered ? <RegisterMessage /> : navigate("/")}
            />
          )}

          <Route element={<RequireAuth allowedRoles={[1]} />}>
            <Route
              path="/managequestionnaire"
              element={<ManageQuestionnaire />}
            />
            <Route path="/categories" element={<Categories />} />
            <Route path="/subsections" element={<Subsections />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/questionnaire/new" element={<Questionnaire />} />
            <Route path="/questionnaire/:id/edit" element={<Questionnaire />} />
            <Route path="/categoriesecurity" element={<Categoriesecurity />} />
            <Route path="/subcategories/:id" element={<Subcategories />} />
            <Route
              path="/requirementssecurity/:id"
              element={<RequirementSecurity />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={[2, 1]} />}>
            <Route path="/listsprojects" element={<ProjectsList />} />

            <Route path="/selectreq/:id" element={<SelectReq />} />

            <Route path="/projects/new" element={<ProjectForm />} />

            <Route path="/projects/:id/edit" element={<ProjectForm />} />

            <Route path="/projects/:id" element={<Projects />} />

            <Route path="/response/:id1/:id2" element={<Response />} />

            <Route
              path="/response/:id1/:id2/:id3/edit"
              element={<Response />}
            />

            <Route
              path="/listresponses/:id1/:id2"
              element={<ListResponses />}
            />

            <Route
              path="/graphicsresults/:id1/:id2/:id3"
              element={<GraphicsResults />}
            />

            <Route
              path="/requirements/project/:id"
              element={<Requirements />}
            />
          </Route>

          
          <Route path="*" element={<NotFoundError />} />
        </Route>
      </Routes>
      </>
  );
}

export default App;
