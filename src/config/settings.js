import { CONTEXTS } from './contexts';
import { REACT_APP_MOCK_API } from './env';

export const DEFAULT_LANG = 'en';

// TODO: Delete.
// avoid breaking the app in production when embedded in different contexts
let defaultApiHost;
const LOCAL_API_HOST = 'localhost:3335';
try {
  defaultApiHost =
    window.parent.location.hostname === 'localhost' ? LOCAL_API_HOST : null;
} catch (e) {
  /* eslint-disable-next-line no-console */
  console.error(e);
  defaultApiHost = null;
}

export const DEFAULT_API_HOST = defaultApiHost;

// TODO: use from graasp constants
export const PERMISSION_LEVELS = {
  WRITE: 'write',
  READ: 'read',
  ADMIN: 'admin',
};

export const DEFAULT_PERMISSION = 'read';

export const MAX_NUM_FILES = 1;
export const MAX_FILE_SIZE = 5 * 1000 * 1000;

export const DEFAULT_LOCAL_CONTEXT = {
  permission: PERMISSION_LEVELS.READ,
  lang: DEFAULT_LANG,
  context: CONTEXTS.PLAYER,
  apiHost: DEFAULT_API_HOST,
};

export const MOCK_API = REACT_APP_MOCK_API === 'true';

export const FILTERED_IDS = [
  '12345678-1234-1234-1234-123456789012',
  'fb178154-c6bb-4d29-82f2-d8e218ac3076', // jeremy.lascala@epfl.ch
  'ba69db6f-e5c4-4fc7-8168-292ff6c81cb8', // denis.gillet@icloud.com
  '58f52887-cb14-4614-b764-709ff0c38efe', // gracianaaad@hotmail.com
];
