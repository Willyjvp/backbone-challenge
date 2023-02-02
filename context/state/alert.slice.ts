import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ActionType {
  SHOW_ALERT = 'show_alert',
  HIDE_ALERT = 'hide_alert',
}

export enum AlertType {
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface Action {
  type: ActionType;
  payload: AlertState;
}

export interface AlertState {
  show: boolean;
  message: string;
  type: AlertType;
}

const initialState: AlertState = {
  show: false, message: '', type: AlertType.INFO
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (_state, action: PayloadAction<AlertState>) => ({ ...action.payload, show: true }),
    hideAlert: () => ({ show: false, message: '', type: AlertType.INFO })
  }
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;
