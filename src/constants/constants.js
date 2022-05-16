import { APP_DATA_TYPES } from '../config/appDataTypes';

/* eslint-disable import/prefer-default-export */
export const RE_FETCH_INTERVAL = 60000; // Default: 1500


export const DEFAULT_CHECK_DATA = {
  state: 'Empty',
};
export const DEFAULT_CHECK = {
  type: APP_DATA_TYPES.CHECK,
  visibility: 'item',
  data: DEFAULT_CHECK_DATA,
};
export const DEFAULT_CHECKLIST = {
  empty: {
    title: 'Empty',
    items: [],
  },
  positive: {
    title: 'Positive',
    items: [],
  },
  negative: {
    title: 'Negative',
    items: [],
  },
  nonApplicable: {
    title: 'Non Applicable',
    items: [],
  },
};

export const APP_SETTINGS = {
  PROGRESS_BAR_DISPLAY: 'progress_bar_display',
};
