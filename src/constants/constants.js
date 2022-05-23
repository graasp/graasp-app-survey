import { APP_DATA_TYPES } from '../config/appDataTypes';

/* eslint-disable import/prefer-default-export */
export const RE_FETCH_INTERVAL = 60000; // Default: 1500

export const CHECKBOX_STATES = {
  Positive: 'Positive',
  NonApplicable: 'NonApplicable',
  Negative: 'Negative',
  Empty: 'Empty',
};

export const DEFAULT_CHECK_DATA = {
  state: CHECKBOX_STATES.Empty,
};
export const DEFAULT_CHECK = {
  type: APP_DATA_TYPES.CHECK,
  visibility: 'member',
  data: DEFAULT_CHECK_DATA,
};

export const APP_SETTINGS = {
  PROGRESS_BAR_DISPLAY: 'progress_bar_display',
};
