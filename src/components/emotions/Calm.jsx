import React from "react"
import Form from "react-bootstrap/Form"

const Calm = ({ handleChange }) => {
  return (
    <Form.Select
      required
      name="title"
      aria-label="Default select example"
      onChange={handleChange}>
      <option>Open this select menu</option>
      <option value="Play some calm music and enjoy the peacefulness">Play some calm music and enjoy the peacefulness</option>
      <option value="Go for a walk">Go for a walk</option>
      <option value="Do stay in the moment and enjoy the peace of heart!">Do stay in the moment and enjoy the peace of heart!</option>
    </Form.Select>
  )
}

export default Calm
