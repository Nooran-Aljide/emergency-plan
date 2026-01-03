import "./styles/styles.scss";
import { useSelector } from "react-redux";
import { RootState } from "./Redux/store";
import SplashScreen from "./components/SplashScreen/main";
import { lazy, Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const MapComponent = lazy(() => import("./components/MapComponents/main"));
const ToolBar = lazy(() => import("./components/ToolbarComponents/main"));

export default function App() {
  const loading = useSelector((state: RootState) => state.emergencies.loading);

  return (
    <div
      className="app"
      style={{ width: "100vw", height: "100vh", position: "relative" }}
    >
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <Suspense fallback={<LoadingOutlined />}>
            <ToolBar />
          </Suspense>
          <Suspense>
            <MapComponent />
          </Suspense>
        </>
      )}
    </div>
  );
}
