import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SafetyAsset } from "../../types/appDataTypes";

interface SafetyAssetsState {
  items: SafetyAsset[];
  loading: boolean;
}

const initialState: SafetyAssetsState = {
  items: [],
  loading: true,
};

const safetyAssetsSlice = createSlice({
  name: "safetyAssets",
  initialState,
  reducers: {
    setSafetyAssets(state, action: PayloadAction<SafetyAsset[]>) {
      state.items = action.payload;
    },
    setSafetyAssetsLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setSafetyAssets, setSafetyAssetsLoading } =
  safetyAssetsSlice.actions;

export default safetyAssetsSlice.reducer;
