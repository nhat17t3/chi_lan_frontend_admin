// const baseUrl = process.env.API || "https://"
const baseUrl = "http://be1.tranlan.tk";
// const baseUrl = "https://mobilelemanh.herokuapp.com";

export const api = `${baseUrl}/api`;

export const generatePublicUrl = (filename) => {
  return `${baseUrl}/public/${filename}`;
};

