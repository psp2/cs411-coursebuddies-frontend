import React, { useState } from "react";
import "./Search.css";

import SearchInfo from "../SearchInfo/SearchInfo";

function Search(props) {
  const [subjectCode, setSubjectCode] = useState("");
  const [courseNumber, setCourseNumber] = useState(0);
  const [searchResults, setSearchResults] = useState([]);

  function handleSubjectChange(event) {
    setSubjectCode(event.target.value);
  }

  function handleCourseChange(event) {
    if (100 <= event.target.value <= 600) {
      setCourseNumber(event.target.value);
    }
  }

  function handleSubmit() {
    console.log(
      "Make API calls here, use subjectCode and courseNumber, and check if valid search!"
    );
    setSearchResults((searchResults) => [
      ...searchResults,
      "temporary results here!",
    ]);
  }

  return (
    <div className="Search">
      <div className="SearchIntro">Find your Course.</div>
      <form className="FormSection">
        <label>
          Subject Code (e.g. CS):
          <input type="text" name="subject" onChange={handleSubjectChange} />
        </label>
        <label>
          Course Number (e.g. 411):
          <input type="number" name="number" onChange={handleCourseChange} />
        </label>
      </form>
      <button onClick={handleSubmit} className="SearchButton">
        Submit
      </button>
      {searchResults.length > 0 && <SearchInfo results={searchResults} />}
    </div>
  );
}

export default Search;
