import React, { useState } from "react";
import GameList from "./GameList";
import Form from "react-bootstrap/Form";

const Library = () => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
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
          placeholder="Search by title or tag"
          className="m-2"
          aria-label="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Form.Select
          className="m-2"
          aria-label="Sort by"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option>Sort By</option>
          <option value="title">Title</option>
          <option value="-id">Newest</option>
          <option value="-maxplayers">Max Players</option>
          <option value="minplayers">Min Players</option>
          <option value="playtime">Time to play</option>
        </Form.Select>
      </Form>
      <GameList list="all" filter={`?ordering=${sort}&search=${query}`} />
    </>
  );
};

export default Library;
