import loginConfig from "../Login/credentials";

export const isAuthenticated = () => {
  const storedUsername = localStorage.getItem("username");
  return storedUsername === loginConfig.VITE_APP_USERNAME;
};
