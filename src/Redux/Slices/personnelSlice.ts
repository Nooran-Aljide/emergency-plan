import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Personnel } from "../../types/appDataTypes";

interface PersonnelState {
  items: Personnel[];
  loading: boolean;
}

const initialState: PersonnelState = {
  items: [],
  loading: true,
};

const personnelSlice = createSlice({
  name: "personnel",
  initialState,
  reducers: {
    setPersonnel(state, action: PayloadAction<Personnel[]>) {
      state.items = action.payload;
    },
    updatePersonnel(state, action: PayloadAction<Personnel>) {
      const index = state.items.findIndex(
        (p) => p.PersonID === action.payload.PersonID
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setPersonnelLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setPersonnel, updatePersonnel, setPersonnelLoading } =
  personnelSlice.actions;

export default personnelSlice.reducer;
