import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { redirect, useNavigate } from "react-router";
import app from "./database/firebase";

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  signUp: (email: string, studentId: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const navigate = useNavigate();
  // We are using `react-router` for this example,
  // but feel free to omit this or use the
  // router of your choice.
  // const history = useHistory();
  // const location = useLocation();

  // If we change page, reset the error state.
  // useEffect(() => {
  //   if (error) setError(null);
  // }, [location.pathname]);

  // Check if there is a currently active session
  // when the provider is mounted for the first time.
  //
  // If there is an error, it means there is no session.
  //
  // Finally, just signal the component that the initial load
  // is over.
  // useEffect(() => {
  //   usersApi.getCurrentUser()
  //     .then((user) => setUser(user))
  //     .catch((_error) => {})
  //     .finally(() => setLoadingInitial(false));
  // }, []);

  // Flags the component loading state and posts the login
  // data to the server.
  //
  // An error means that the email/password combination is
  // not valid.
  //
  // Finally, just signal the component that loading the
  // loading state is over.
  function login(email: string, password: string) {
    setLoading(true);
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: User = userCredential.user;
        setUser(user);
        navigate("/app");
        setLoading(false);
      })
      .catch((err: { code: string; message: string }) => {
        console.log(err.code, err.message);
        setLoading(false);
      });
  }

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  function signUp(email: string, studentId: string, password: string) {
    setLoading(true);
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: User = userCredential.user;
        setUser(user);
        // console.log("Success signed up: ", user);
        navigate("/app");
        setLoading(false);
      })
      .catch((err: { code: string; message: string }) => {
        console.log(err.code, err.message);
        setLoading(false);
      });
  }

  // Call the logout endpoint and then remove the user
  // from the state.
  function logout() {
    setUser(undefined);
  }

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      signUp,
      logout,
    }),
    [user, loading, error]
  );

  // We only want to render the underlying app after we
  // assert for the presence of a current user.
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}

export const AuthWrapper = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const navigate = useNavigate();
  const goToLogin = useCallback(() => navigate("/login"), []);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      goToLogin();
    }
  }, [user, goToLogin]);

  return children;
};
