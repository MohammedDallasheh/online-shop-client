export const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: theme,
});

export const expandInvoices = (id) => ({
  type: 'RA/TOGGLE_LIST_ITEM_EXPAND',
  payload: id,
  meta: {
    resource: 'orders',
  },
});
export const changeLocation = (payload) => ({
  type: '@@router/LOCATION_CHANGE',
  payload: payload || {
    location: {
      pathname: '/',
      search: '',
      hash: '',
      state: null,
    },
    action: 'PUSH',
    isFirstRendering: false,
  },
});
