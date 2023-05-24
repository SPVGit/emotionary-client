import React from "react"
import Form from "react-bootstrap/Form"

const Depressed = ({ handleChange }) => {//if negative emotion, select from a lists of specific activites to ward off the negative emotion
  return (
    <Form.Select
      required
      name="title"
      aria-label="Default select example"
      onChange={handleChange}>
      <option>Open this select menu</option>
      <option value="Take some deep breaths for a few minutes">Take some deep breaths for a few minutes</option>
      <option value="Go out for a walk">Go out for a walk</option>
      <option value="Go for a run">Go for a run</option>
      <option value="Do some meditation">Do some meditation</option>
      <option value="Do some yoga">Do some yoga</option>
      <option value="Eat healthy food">Eat healthy food</option>
      <option value="Get a good night's sleep">Get a good night's sleep</option>
      <option value="Avoid alcohol">Avoid alcohol</option>
      <option value="Quit smoking">Quit smoking</option>
    </Form.Select>
  )
}

export default Depressed
