import React from "react"
import Form from "react-bootstrap/Form"

const Angry = ({ handleChange }) => {
  return (
    <Form.Select
      required
      name="title"
      aria-label="Default select example"
      onChange={handleChange}>
      <option>Open this select menu</option>
      <option value="Count to ten before reacting">Count to ten before reacting</option>
      <option value="Take some deep breaths for a few minutes">Take some deep breaths for a few minutes</option>
      <option value="Do some meditation">Do some meditation</option>
      <option value="Go out for a run">Go out for a run</option>
    </Form.Select>
  )
}

export default Angry
