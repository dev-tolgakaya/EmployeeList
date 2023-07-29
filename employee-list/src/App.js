import Loading from "./components/loading";
import { useSelector } from "react-redux";
import Content from "./pages";
import "./App.scss";

function App() {
  const loading = useSelector((state) => state.runtime.loading);
  return (
    <div>
      {" "}
      <Loading />
      <Content />{" "}
    </div>
  );
}

export default App;
