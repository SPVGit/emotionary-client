import React from 'react'
import AddPost from '../components/AddPost'

const PostFormPage = ({user}) => {
  return (
    <div>
            <AddPost user={user}/>
    </div>
  )
}

export default PostFormPage