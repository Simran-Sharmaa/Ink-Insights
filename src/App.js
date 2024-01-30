import { Suspense, useEffect, useState } from "react";
import "./App.css";
import authservice from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Footer, Header, Loader } from "./components/index";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    authservice
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);
  return loading ? (
    <div className="App">
      <Loader />
    </div>
  ) : (
    // ):<div className='container'>
    <div>
      <div className="container">
        <Suspense fallback={<Loader />}>
          <Header />
          <Outlet />
        </Suspense>
      </div>
      {/* <Footer/> */}
    </div>
  );
  // return (
  //   <div>
  //     <Header/>
  //   </div>
  // )
}

export default App;
