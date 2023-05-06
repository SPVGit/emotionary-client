import React from 'react'
import Form from 'react-bootstrap/Form'

const Sad = ({handleChange}) => {

  return (
    <Form.Select name="title" type="text" aria-label="Default select example" size="lg" required>
    <option>Open this select menu</option>
    <option value="4">Four</option>
    <option value="5">Five</option>
    <option value="6">Six</option>
  </Form.Select>
  )
}

export default Sad