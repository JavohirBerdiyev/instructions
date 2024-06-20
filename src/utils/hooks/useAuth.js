import { useDispatch, useSelector } from "react-redux";
import { setUser, initialState } from "store/auth/userSlice";
import { apiSignOut } from "services/AuthService";
import { onSignInSuccess, onSignOutSuccess } from "store/auth/sessionSlice";
import appConfig from "configs/app.config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function useAuth() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { token, signedIn } = useSelector((state) => state.auth.session);

  const signIn = async ({ email, password }) => {
    try {
      if (true) {
        dispatch(onSignInSuccess("token"));
        dispatch(
          setUser({
            avatar: "",
            authority: ["USER"],
            email: "",
          })
        );
        navigate(appConfig.authenticatedEntryPath);
        return {
          status: "success",
          message: "",
        };
      }
    } catch (errors) {
      return {
        status: "failed",
        message: errors?.response?.data?.message || errors.toString(),
      };
    }
  };

  const handleSignOut = () => {
    dispatch(onSignOutSuccess());
    dispatch(setUser(initialState));
    navigate(appConfig.unAuthenticatedEntryPath);
  };

  useEffect(() => {
    // if(!sessionStorage.getItem('client-token')) {
    //   handleSignOut();
    // }
  }, [sessionStorage])

  const signOut = async () => {
    try {
      // await apiSignOut();
      sessionStorage.removeItem('client-token');
      sessionStorage.removeItem('permissions');
      handleSignOut();
      window.location.reload();
    } catch (errors) {
      handleSignOut();
    }
  };

  return {
    authenticated: token && signedIn,
    signIn,
    signOut,
  };
}

export default useAuth;
