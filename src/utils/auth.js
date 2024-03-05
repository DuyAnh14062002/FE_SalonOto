export const setAccessTokenToLs = (access_token) => {
  localStorage.setItem("access_token", access_token);
};

export const getAccessTokenFromLs = () => {
  return localStorage.getItem("access_token") || "";
};

export const clearLs = () => {
  localStorage.removeItem("access_token");
};
export const getProfileFromLs = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};
export const setProfileToLs = (profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};
