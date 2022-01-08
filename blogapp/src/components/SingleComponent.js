import { useParams } from "react-router"
import axios from "axios"
import { useState, useEffect } from 'react'
import NavbarComponent from "./NavbarComponent"
import parse from 'html-react-parser';


const SingleComponent  = () => {
    const params = useParams();
    const [blog, setBlog] = useState('');
    

    useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
        .then(response =>{
            setBlog(response.data)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    return(
        <div className="container">
            <NavbarComponent/>
            <h1>{blog.slug}</h1>
            <div>{(blog.content)}</div>
            <p className="text-muted">ผู้เขียน : {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
            {/* <p>My name is Bank</p> */}
        </div>
        )}

export default SingleComponent