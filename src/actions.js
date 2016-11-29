import _ from 'lodash';
import {
  NAME_KEY,
  UUID_KEY,
  GLOBAL_KEY,
  REGISTER,
  UNREGISTER
} from './constants';


export const register = (name, uuid) => ({
  type: REGISTER,
  meta: {
    [UUID_KEY]: uuid,
    [NAME_KEY]: name
  }
});

export const unregister = (name, uuid) => ({
  type: UNREGISTER,
  meta: {
    [UUID_KEY]: uuid,
    [NAME_KEY]: name
  }
});

export const wrapAction = (action, name, uuid) => {
  const isGlobal = (
    _.has(action, ['meta', GLOBAL_KEY])
    && action.meta[GLOBAL_KEY]
  );

  if (isGlobal) {
    return _.omit(action, 'meta');
  }

  return {
    ...action,
    meta: {
      ...action.meta,
      [UUID_KEY]: uuid,
      [NAME_KEY]: name
    }
  }
};

export const wrapAsGlobalAction = (action) => ({
  ...action,
  meta: {
    [GLOBAL_KEY]: true
  }
});
