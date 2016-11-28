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

export const wrapAction = (action, name, uuid) => ({
  ...action,
  meta: {
    ...action.meta,
    [UUID_KEY]: uuid,
    [NAME_KEY]: name
  }
});

export const wrapAsGlobalAction = (action) => ({
  ...(_.isFunction(action) ? action(): action),
  meta: {
    [GLOBAL_KEY]: true
  }
});
