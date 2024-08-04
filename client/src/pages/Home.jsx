import React from "react";

function Home({ profile, docs, setPath, loadingDocs }) {
  console.log({ profile, docs });
  return (
    <>
      <h1>Welcome {profile?.firstName || "Guest"}</h1>
      <button
        onClick={() => {
          if (!profile) {
            setPath("login");
          } else {
            window.location.reload();
          }
        }}
      >
        {profile ? "Logout" : "Login"}
      </button>
      {loadingDocs ? (
        "Loading..."
      ) : (
        <ul>
          {docs?.data?.map((doc) => (
            <>
              <li key={doc._id}>
                <h3
                  style={{
                    textAlign: "left",
                  }}
                >
                  {doc.title}
                  {doc.interactionCount > 0 && (
                    <span style={{ color: "red" }}>
                      {" "}
                      ({doc.interactionCount})
                    </span>
                  )}
                </h3>
              </li>
              <ul>
                {doc.interactions.map((interaction) => (
                  <li key={interaction._id}>{interaction.comment}</li>
                ))}
              </ul>
            </>
          ))}
        </ul>
      )}
    </>
  );
}

export default Home;
