import React from "react"
import Form from "react-bootstrap/Form"

const Embarrassed = ({ handleChange }) => {
  return (
    <Form.Select
      required
      name="title"
      aria-label="Default select example"
      onChange={handleChange}>
      <option>Open this select menu</option>
      <option value="Take some deep breaths for a few minutes">Take some deep breaths for a few minutes</option>
      <option value="Go out for a walk">Go out for a walk</option>
      <option value="Do some meditation">Do some meditation</option>
      <option value="Do some arts and crafts">Do some arts and crafts</option>
    </Form.Select>
  )
}

export default Embarrassed
