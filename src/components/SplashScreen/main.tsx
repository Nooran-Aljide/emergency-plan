import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setEmergencies } from "../../Redux/Slices/emergenciesSlice";
import type { AppDispatch } from "../../Redux/store";
import type { Emergency } from "../../types/appDataTypes";
import fetchData from "../../API/fetchData";
import { LoadingOutlined } from "@ant-design/icons";
import "./styles.scss";

export default function SplashScreen() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, isLoading, isSuccess, isError, error } = useQuery<Emergency[]>({
    queryKey: ["emergencies"],
    queryFn: () => fetchData<Emergency[]>("/data/emergencies.json"),
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setEmergencies({
          items: data,
          loading: false,
          activeEmergency: data && data?.length > 0 ? data[0] : null,
        })
      );
    }
  }, [isSuccess, data, dispatch]);

  return (
    <div className="splash-screen">
      <h1>Emergency Evacuation System</h1>
      {isLoading && !isError && <LoadingOutlined className="splash-loader" />}
      {isError && <p style={{ color: "red" }}>{(error as Error).message}</p>}
    </div>
  );
}
