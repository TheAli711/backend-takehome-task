import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [path, setPath] = useState("home");
  const [token, setToken] = useState(null);
  const [docs, setDocs] = useState({
    data: [],
  });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState({
    profile: false,
    docs: false,
  });

  const fetchAuthDocs = React.useCallback(async () => {
    const res = await fetch("api/v1/documents/authenticated", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  }, [token]);

  const fetchUnAuthDocs = React.useCallback(async () => {
    const res = await fetch("api/v1/documents");
    return await res.json();
  }, []);

  const fetchProfile = React.useCallback(async () => {
    const res = await fetch("api/v1/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  }, [token]);

  useEffect(() => {
    const main = async () => {
      setLoading({
        profile: true,
        docs: true,
      });
      let res;
      if (token) {
        setProfile(await fetchProfile());
        setLoading((prev) => ({ ...prev, profile: false }));
        res = await fetchAuthDocs();
      } else {
        setLoading((prev) => ({ ...prev, profile: false }));
        res = await fetchUnAuthDocs();
      }
      setDocs(res);
      setLoading((prev) => ({ ...prev, docs: false }));
    };
    main();
  }, [token]);

  switch (path) {
    case "home":
      return (
        <>
          {loading.profile ? (
            "Loading..."
          ) : (
            <Home
              setPath={setPath}
              setToken={setToken}
              profile={profile}
              docs={docs}
              loadingDocs={loading.docs}
            />
          )}
        </>
      );
    case "login":
      return <Login setPath={setPath} setToken={setToken} />;
    default:
      return <h1>404 Page</h1>;
  }
}

export default App;
