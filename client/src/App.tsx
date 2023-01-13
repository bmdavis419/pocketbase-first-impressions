import PocketBase from "pocketbase";
import { useState } from "react";

// REPLACE WITH YOUR OWN URL THIS WILL BE DELETED
const pb = new PocketBase(import.meta.env.VITE_PB_URI as string);

function LoggedIn({
  setLoggedIn,
}: {
  setLoggedIn: (loggedIn: boolean) => void;
}) {
  return (
    <div>
      Logged in
      <button
        onClick={(e) => {
          e.preventDefault();

          pb.authStore.clear();

          setLoggedIn(false);
        }}
      >
        logout
      </button>
    </div>
  );
}

function LoggedOut({
  setLoggedIn,
}: {
  setLoggedIn: (loggedIn: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      onSubmit={(e) => {
        e.preventDefault();

        pb.collection("users")
          .create({
            email,
            password,
            passwordConfirm: password,
          })
          .then(() => {
            console.log("user created");
          });
      }}
    >
      <div>
        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();

          pb.collection("users")
            .create({
              email,
              password,
              passwordConfirm: password,
            })
            .then(() => {
              // sign in
              pb.collection("users")
                .authWithPassword(email, password)
                .then(() => {
                  alert("logged in");
                  setLoggedIn(true);
                });
            });
        }}
      >
        Signup
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();

          pb.collection("users")
            .authWithPassword(email, password)
            .then(() => {
              alert("logged in");
              setLoggedIn(true);
            });
        }}
      >
        Sign In
      </button>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(pb.authStore.isValid);
  return loggedIn ? (
    <LoggedIn setLoggedIn={setLoggedIn} />
  ) : (
    <LoggedOut setLoggedIn={setLoggedIn} />
  );
}

export default App;
