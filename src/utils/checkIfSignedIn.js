
export const checkIfUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);

    // Optional: Check if token is expired
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      console.warn('Token expired');
      return false;
    }

    return true;
  } catch (e) {
    console.error('Invalid token format', e);
    return false;
  }
};
