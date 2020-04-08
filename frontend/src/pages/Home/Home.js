import React, { useState } from "react";
import "./Home.css";
import { compose } from "recompose";
import { withRouter, Redirect } from "react-router-dom";

import Login from "../../components/Login/Login";
import Search from "../../components/Search/Search";

function Home() {
  const [searchMode, setSearchMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  function handleSearchClick() {
    setSearchMode(true);
  }

  function handleStudyBuddiesClick() {
    console.log("Handle Study Buddies... Later!");
  }

  return (
    <div>
      {!searchMode && (
        <div className="Home">
          <div>
            <div>Study Buddies</div>
          </div>
          {loggedIn && (
            <div>
              <button className="HomeButton" onClick={handleSearchClick}>
                Search for Classes
              </button>
              <button className="HomeButton" onClick={handleStudyBuddiesClick}>
                Find Study Buddies!
              </button>
            </div>
          )}
          {!loggedIn && <Login signIn={setLoggedIn} setUsername={setUser} />}
        </div>
      )}
      {searchMode && <Search validUser={loggedIn} name={user} />}
    </div>
  );
}

export default compose(withRouter)(Home);
