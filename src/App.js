import RoutesComponent from "./routes";
import { getCurrentUser } from "./redux/actions/userActions";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
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
