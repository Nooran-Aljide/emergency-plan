import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Emergency } from "../../types/appDataTypes";

interface EmergenciesState {
  items: Emergency[];
  loading: boolean;
  activeEmergency: Emergency | null;
}

const initialState: EmergenciesState = {
  items: [],
  loading: true,
  activeEmergency: null,
};

const emergenciesSlice = createSlice({
  name: "emergencies",
  initialState,
  reducers: {
    setEmergencies(state, action: PayloadAction<EmergenciesState>) {
      state.items = action.payload.items;
      state.loading = false;
      state.activeEmergency = action.payload.activeEmergency;
    },
    setActiveEmergency(state, action: PayloadAction<Emergency>) {
      state.activeEmergency = action.payload;
    },
  },
});

export const { setEmergencies, setActiveEmergency } = emergenciesSlice.actions;

export default emergenciesSlice.reducer;
