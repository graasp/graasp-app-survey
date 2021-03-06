import { APP_DATA_TYPES } from '../config/appDataTypes';

/* eslint-disable import/prefer-default-export */
export const RE_FETCH_INTERVAL = 60000; // Default: 1500

export const DEFAULT_SUBMIT_CONFIRM = {
  type: APP_DATA_TYPES.SUBMIT_CONFIRM,
  // visibility: 'member',
  data: {},
};

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
  // visibility: 'member', // TODO: hahaha
  data: DEFAULT_CHECK_DATA,
};
