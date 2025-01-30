import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const authGuard = (WrappedComponent) => {
  return function ProtectedRoute(props) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          router.replace("/"); // Redirect if not logged in
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }, [router, auth]);

    if (loading) return null; // Prevent flicker

    return <WrappedComponent {...props} />;
  };
};

export default authGuard;
