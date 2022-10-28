import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import app from "../database/firebase";

type User = {
  uid: string;
  refreshToken: string;
};

interface AuthContextType {
  user?: User;
  loading: boolean;
  loadingInitial: boolean;
  authenticated: boolean;
  error?: any;
  login: (email: string, password: string) => void;
  signUp: (
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  ) => void;
  logout: () => void;
  getLoginState: () => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthError = {
  message: string;
  code: string;
  error: boolean;
};

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<User | undefined>();
  const [error, setError] = useState<AuthError>({
    message: "",
    code: "",
    error: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);
  const navigate = useNavigate();

  // Even if you refresh it persists the login state
  function getLoginState() {
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAuthenticated(false);
        setLoadingInitial(false);
        setUser(undefined);
      } else {
        setAuthenticated(true);
        setLoadingInitial(false);
        setUser({
          uid: user.uid,
          refreshToken: user.refreshToken,
        });
      }
    });
  }
  // Finally, just signal the component that loading the
  // loading state is over.
  function login(email: string, password: string) {
    setLoading(true);
    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: FirebaseUser = userCredential.user;
        setAuthenticated(true);
        setUser({
          uid: user.uid,
          refreshToken: user.refreshToken,
        });
        navigate("/app");
        setLoading(false);
        setError({ message: "", code: "", error: false });
      })
      .catch(({ code, message }: { code: string; message: string }) => {
        setLoading(false);
        setAuthenticated(false);
        setError({
          message,
          code,
          error: true,
        });
      });
  }

  // Sends sign up details to the server. On success we just apply
  // the created user to the state.
  function signUp(
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string
  ) {
    setLoading(true);
    if (confirmPassword !== password) {
      setError({
        message: "Passwords do not match!",
        code: "230",
        error: true,
      });
      setLoading(false);
      return;
    }
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: User = userCredential.user;
        setUser(user);
        const db = getDatabase(app);
        const userRef = ref(db, `/users/${user.uid}`);
        const userDetails = {
          firstName,
          lastName,
        };
        set(userRef, userDetails);

        navigate("/app");
        setLoading(false);
        setError({ message: "", code: "", error: false });
      })
      .catch(({ code, message }: { code: string; message: string }) => {
        setError({
          message,
          code,
          error: true,
        });
        setLoading(false);
      });
  }

  // Call the logout endpoint and then remove the user
  // from the state.
  function logout() {
    const auth = getAuth();
    auth.signOut();
    setAuthenticated(false);
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
      loadingInitial,
      authenticated,
      getLoginState,
      error,
      login,
      signUp,
      logout,
    }),
    [user, authenticated, loading, loadingInitial, error]
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
  const { authenticated, loadingInitial, getLoginState } = useAuth();
  const navigate = useNavigate();
  const goToLogin = useCallback(() => navigate("/login"), []);
  const getAuthState = useCallback(getLoginState, []);

  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  useEffect(() => {
    if (loadingInitial) {
      return;
    }
    if (!authenticated) {
      goToLogin();
    }
  }, [goToLogin, authenticated, loadingInitial]);

  return loadingInitial ? <Spinner animation="grow" /> : children;
};
