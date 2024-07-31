export default function authHeader() {
  const obj = JSON.parse(sessionStorage.getItem("token") || "");

  if (obj && obj.accessToken) {
    return { Authorization: obj.accessToken };
  } else {
    return {};
  }
}
