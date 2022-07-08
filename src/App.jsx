import React from "react";
import RoutesComponent from "./routes";
import { getCurrentUser } from "./redux/actions/userActions";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (Cookies.get('token')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);
  return (
    <RoutesComponent />
  )
}
export default App;
