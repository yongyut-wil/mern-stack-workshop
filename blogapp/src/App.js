import NavbarComponent from "./components/NavbarComponent";
import axios from "axios"
import { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2'
import parse from 'html-react-parser';
import {getUser,getToken} from './services/authorize'
// import ReactQuill from "react-quill";



function App() {
  const [blogs, setBlogs] = useState([])

  const fetchData=()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then((response) => {
      setBlogs(response.data)
    })
    .catch(err=>alert(err))
  }
  useEffect(()=>{
    fetchData()
  },[])


  const confirmDelete = (slug)=>{
    Swal.fire({
      title: 'คุณแน่ใช่ไหม ?',
      text: "ที่ต้องการลบบทความนี้ !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ต้องการลบ !',
      cancelButtonText:'ยกเลิก'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog =(slug) => {
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`,
    {
      headers:{
          authorization:`Bearer ${getToken()}` 
      }
  })
    .then(response =>{
      Swal.fire(
        'ลบสำเร็จ!',
        response.data.message,
        'success'
      )
      fetchData()
    }).catch(err=>console.log(err))
  }

  // const parse = require('html-react-parser');

  // const renderHTML = require('react-render-html');

  return (
    
    <div className='container p-5'>
      <NavbarComponent/>
      <h1>Mern Stack | Workshop</h1>
      
      {blogs.map((blog, index)=>(
        <div className="row" key={index} style={{borderBottom:'1px solid siver'}}>
          <div className="col pt-3 pb-2">
            
            <Link to={`/blog/${blog.slug}`}> 
            <h2>{blog.title}</h2>
            </Link>
            <p>{parse(blog.content.substring(0,250))}</p>
            {/* <p>{ReactQuill.getText(blog.content.substring(0,250))}</p> */}
            <p className="text-muted">ผู้เขียน : {blog.author} , เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
            
            {getUser() && (
              <div>
                <Link className="btn btn-outline-success" to={`/blog/edit/${blog.slug}`}>แก้ไขบทความ</Link>
            <button className="btn btn-outline-danger" onClick={()=>confirmDelete(blog.slug)}>ลบบทความ</button>
              </div>
            )}

            
          </div>
        </div>
      ))}


    </div>
  );
}

export default App;
