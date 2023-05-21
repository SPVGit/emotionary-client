import React from "react"
import Form from "react-bootstrap/Form"

const Sad = ({ handleChange }) => {
  return (
    <Form.Select
      required
      name="title"
      aria-label="Default select example"
      onChange={handleChange}>
      <option>Open this select menu</option>
      <option value="Meet a friend for a coffee">Meet a friend for a coffee</option>
      <option value="Go out for a walk">Go out for a walk</option>
      <option value="Do some meditation">Do some meditation</option>
      <option value="Do some arts and crafts">Do some arts and crafts</option>
    </Form.Select>
  )
}

export default Sad
