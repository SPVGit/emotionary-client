import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const API_URL = "http://localhost:5006";

const SinglePostPage = (props) => {
  const [post, setPost] = useState(null);
  const [activities, setActivities] = useState([])
  const { postId } = useParams();

  console.log("postId", postId);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const getPost = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const singlePost = response.data;
        console.log("response.data", response.data);

        setPost(singlePost);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPost();
  }, []);

  
  const deletePost = () => {
    axios
    .delete(`${API_URL}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then((response) => {
      console.log("delete response", response.data.message);
      navigate("/posts");
    })
    .catch((err) => console.log(err));
  };

  const deleteActivity =  (activityId) => {
     console.log('kitty')
     //delete from the front end
     setActivities(activities => {
      const newActivities = activities.filter(activity => {
        return activity._id !== activityId
      })
      return newActivities
     })

 axios
      .delete(`${API_URL}/posts/${postId}/${activityId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })

        console.log('monkey')
  navigate("/posts");

 //  .catch((err) => console.log(err))
  }


  /* Diogo's delete code on todos-final-boss 
  
  import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Todo from './../../components/Todo'
import { AuthContext } from '../../context/auth.context'

function TodosPage() {

  const [todos, setTodos] = useState([])

  const { user } = useContext(AuthContext)

  const updateTodoAPI = (updatedTodo) => {
    // update the back-end
    axios.put(`http://localhost:5005/todos/`, {todos, updatedTodo},
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        if (response.data) {

          
            console.log(response.data)
          

        }
      })
  }

  const updateTodoArray = (value, id) => {

    let updatedTodo

    // update the front-end
    setTodos(todos => {
      return todos.map(todo => {
        if (todo._id == id) {
          todo.title = value
          updatedTodo = todo
        }
        return todo
      })
    })
    
    updateTodoAPI(updatedTodo)


  }


  const handleSubmit = (event) => {

    event.preventDefault()

    const form = event.target

    const title = form.title.value
    const description = form.description.value
    const deadline = form.deadline.value

    const newTodo = { title, description, deadline, userId: user._id }

    console.log(newTodo)

    axios.post(`http://localhost:5005/todos/`,
      newTodo,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        if (response.data) {

          const newTodos = response.data
          setTodos(newTodos)

        }
      })
  }

  const storedToken = localStorage.getItem('authToken');
  useEffect(() => {

    axios.get(`http://localhost:5005/user/${user._id}/todos/`,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        const todos = response.data
        setTodos(todos)
      })

  }, [])

  const deleteTodo = (id) => {

    // delete from the front-end
    setTodos(todos => {

      const newTodos = todos.filter(todo => {
        return todo._id !== id
      })

      return newTodos

    })

    axios.delete(`http://localhost:5005/todos/${id}/`,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {

        const deletedTodo = response.data

        if (deletedTodo._id !== id) {
          throw `Something went wrong.`
        }

      }).catch(err => {
        console.error(err)
      })

  }

  return (
    <div>

      <h1> Todos List </h1>

      {
        !todos.length && <div> No Todos Found! 😡 </div>
      }

      <div id='todo-list'>
        {todos.map(todo => (
          <Todo key={todo._id} todo={todo} deleteTodo={deleteTodo} updateTodoArray={updateTodoArray} />
        ))}
      </div>

      <form onSubmit={handleSubmit}>

        <input type='text' name='title' />
        <input type='text' name='description' />
        <input type='date' name='deadline' />

        <input type='submit' />
      </form>

    </div>
  )
}

export default TodosPage
  */

  return (
    <div className="SinglePostPage">
      {post && (
        <div>
          <p>{post.date}</p>
          <h2>{post.emotion}</h2>
          <p>{post.description}</p>
          <p>{post.rating}</p>
          {post.activities.map((activity) => (
            <ListGroup key={activity._id}>
              <ListGroup.Item>{activity.title}</ListGroup.Item>
              <ListGroup.Item>{activity.level}</ListGroup.Item>
              <ListGroup.Item>{activity.time}</ListGroup.Item>
              <ListGroup.Item>{activity.successRating}</ListGroup.Item>
              <ListGroup.Item>{activity.notes}</ListGroup.Item>
              <button onClick={() => deleteActivity(activity._id)}>Delete</button>
              <Link to={`/posts/${postId}/${activity._id}`}>
                <button>Go to activity</button>
              </Link> 
              <Link to={`/posts/${postId}/edit/${activity._id}`}>
                <button>Edit activity</button>
              </Link> 
            </ListGroup>
          ))}
        </div>
      )}
      <Link to={`/addActivity/${postId}`}>
        <button>Add Activity</button>
      </Link>

      <Link to={`/posts/edit/${postId}`}>
        <button>Edit Post</button>
      </Link>
      <button onClick={deletePost}>Delete</button>
    </div>
  );
};

export default SinglePostPage;
