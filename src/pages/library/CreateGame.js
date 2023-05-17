import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { axiosReq } from "../../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const CreateGame = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [gameData, setGameData] = useState({
    title: "",
    tags: "",
    minplayers: 1,
    maxplayers: 4,
    playtime: 0,
  });

  const { title, tags, minplayers, maxplayers, playtime } = gameData;

  const handleChange = (event) => {
    setGameData({
      ...gameData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Check refresh before sending
      const { data } = await axiosReq.post("games/", gameData);
      console.log(data.user);
      navigate(`/game/${data.id}`);
    } catch (err) {
      console.log(errors.data);
      //   Only log errors if response is not authentication error
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <>
      <h1>List a new game</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Game Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Game Title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.title?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
        <Form.Group className="mb-3" controlId="tags">
          <Form.Label>Game Categories</Form.Label>
          <Form.Control
            type="text"
            placeholder="Categories"
            name="tags"
            value={tags}
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            Example: card, party, strategy
          </Form.Text>
        </Form.Group>
        {errors.tags?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
        <Form.Group className="mb-3" controlId="minplayers">
          <Form.Label>Minimum Players</Form.Label>
          <Form.Control
            required
            type="number"
            name="minplayers"
            value={minplayers}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.minplayers?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
        <Form.Group className="mb-3" controlId="maxplayers">
          <Form.Label>Maximum Players</Form.Label>
          <Form.Control
            required
            type="number"
            name="maxplayers"
            value={maxplayers}
            onChange={handleChange}
          />
        </Form.Group>
        {errors.maxplayers?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
        <Form.Group className="mb-3" controlId="playtime">
          <Form.Label>Time to play</Form.Label>
          <Form.Select
            required
            aria-label="Select Game Play Time"
            name="playtime"
            value={playtime}
            onChange={handleChange}
          >
            {/* These should match choices in Game model */}
            <option value="0">0-5 minutes</option>
            <option value="5">5-10 minutes</option>
            <option value="10">10-20 minutes</option>
            <option value="20">20-40 minutes</option>
            <option value="40">40-90 minutes</option>
            <option value="90">90 + minutes</option>
          </Form.Select>
        </Form.Group>
        {errors.playtime?.map((message, idx) => (
          <Alert key={idx} variant="warning">
            {message}
          </Alert>
        ))}
        <Button className="m-2" variant="info" type="submit">
          Add Game
        </Button>
        <Button className="m-2" variant="info" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        {errors.non_field_errors?.map((message, idx) => (
          <Alert key={idx} variant="warning" className="mt-3">
            {message}
          </Alert>
        ))}
      </Form>
    </>
  );
};

export default CreateGame;