import React, { useState } from "react";
import GameList from "./GameList";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Library = () => {
  const [query, setQuery] = useState("");
  return (
    <>
      <Form
        className="d-flex"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Form.Control
          type="search"
          placeholder="Search"
          className="m-2"
          aria-label="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button className="m-2" variant="info">
          Search
        </Button>
      </Form>
      <GameList list="all" filter={`?search=${query}`} />
    </>
  );
};

export default Library;
