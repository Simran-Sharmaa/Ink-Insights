import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import dbservice from "../appwrite/db_and_storage"
import { useNavigate, useParams } from 'react-router-dom'
function EditPost() {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate= useNavigate();
    useEffect(()=>{
        if(slug){
            dbservice.getPost(slug).then((post)=>{
                if(post)
                setPost(post);
            })
        }else{
            navigate("/")
        }
    },[slug,navigate])
  return post?(
    <div>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ):null
}

export default EditPost