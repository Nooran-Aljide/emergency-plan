import { configureStore } from "@reduxjs/toolkit";
import emergenciesReducer from "./Slices/emergenciesSlice";
import evacuationZonesReducer from "./Slices/evacuationZonesSlice";
import personnelReducer from "./Slices/personnelSlice";
import safetyAssetsReducer from "./Slices/safetyAssetsSlice";

export const store = configureStore({
  reducer: {
    emergencies: emergenciesReducer,
    evacuationZones: evacuationZonesReducer,
    personnel: personnelReducer,
    safetyAssets: safetyAssetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
