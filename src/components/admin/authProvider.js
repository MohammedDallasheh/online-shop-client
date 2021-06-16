const authProvider = (user, goHome) => ({
  checkError: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
  getPermissions: () =>
    ['admin', 'seller', 'subscriber'].includes(user?.role)
      ? Promise.resolve(user?.role)
      : Promise.reject(),
  getIdentity: () => user,
  getHome: (str = '') => Promise.resolve(goHome(str)),
});

export default authProvider;
