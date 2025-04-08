export const isUserAdmin = () => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      try {
        const decoded = jwt_decode(userToken);
        return !!decoded?.isAdmin; // force to boolean
      } catch (e) {
        console.error('Invalid token:', e);
        return false;
      }
    }
    return false;
  };
  