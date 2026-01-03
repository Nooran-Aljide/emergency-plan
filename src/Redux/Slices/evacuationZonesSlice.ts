import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EvacuationZone } from "../../types/appDataTypes";

interface EvacuationZonesState {
  items: EvacuationZone[];
  loading: boolean;
}

const initialState: EvacuationZonesState = {
  items: [],
  loading: true,
};

const evacuationZonesSlice = createSlice({
  name: "evacuationZones",
  initialState,
  reducers: {
    setEvacuationZones(state, action: PayloadAction<EvacuationZone[]>) {
      state.items = action.payload;
    },
    setEvacuationZonesLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setEvacuationZones, setEvacuationZonesLoading } =
  evacuationZonesSlice.actions;

export default evacuationZonesSlice.reducer;
