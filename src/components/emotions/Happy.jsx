import React from "react"
import Form from "react-bootstrap/Form"

const Happy = ({ handleChange }) => {//if feeling positive, choose from a list of specific activities to prolong the feeling of positivity
  return (
    <Form.Select
      name="title"
      aria-label="Default select example"
      onChange={handleChange}>
      <option>Open this select menu</option>
      <option value="Call a friend and share your happiness">Call a friend and share your happiness</option>
      <option value="Do some charity! Spread your happiness!">Do some charity! Spread your happiness!</option>
      <option value="Do stay in the moment and enjoy!">Do stay in the moment and enjoy!</option>
    </Form.Select>
  )
}

export default Happy
