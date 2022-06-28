import React, { FC } from "react";
import RoutesComponent from "./routes";
import { getCurrentUser } from "./redux/actions/userActions";
import Cookies from "js-cookie";
import { useAppDispatch } from "./redux/store";
import { useEffect } from "react";
const App: FC = () => {
  const dispatch = useAppDispatch();
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
