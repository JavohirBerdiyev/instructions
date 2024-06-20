export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user-token") || "null");
  if (user) {
    return { access_token: `Bearer ${user?.state.token.access}` };
  } else {
    // auth error handler
    return {};
  }
}
