
// import React, { Component } from 'react';
import { useState, useEffect } from 'react'
import axios from "axios"
import { useParams } from "react-router"
import NavbarComponent from "./NavbarComponent"
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getUser,getToken } from "../services/authorize"
import {useNavigate   } from 'react-router-dom'



const Editcomponent = () => {
    let navigate = useNavigate();
    const params = useParams()
    const [state,setState] = useState({
        title:"",
        content:"",
        author:"",
        slug:""
    })
    const {title, author,slug} = state
    const [content, setContent] = useState('')

    const submitContent=(event)=>{
        setContent(event)
    }
    useEffect(() => {
        !getUser() && navigate('/login')
    },[])
    
    //ดึงข้อมูล
    useEffect(()=>{
        axios
        .get(`${process.env.REACT_APP_API}/blog/${params.slug}`,
        {
            headers:{
                authorization:`Bearer ${getToken()}` 
            }
        })
        .then(response=>{
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
        })
        .catch(err=>alert(err))
        // eslint-disable-next-line
    },[])
    

    const showUpdateForm = () => (
        <form onSubmit={submitForm}>
                <div className='form-group'>
                    <label>ชื่อบทความ</label>
                    <input type="text" className="form-control"value={title} onChange={inputValue("title")}/>
                </div>
                <div className="form-group">
                    <label>รายละเอียด</label>
                        <ReactQuill
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="เขียนรายละเอียดบทความของคุณ"
                        style={{border:'1px solid #666'}}
                />
                </div>
                <div className='form-group'>
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control"value={author} onChange={inputValue("author")}/>
                </div>
                <br/>
                <input type="submit" value="อัพเดต" className="btn btn-primary"/>
            </form>
    )

    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value})
    }

    const submitForm=(e)=>{
        e.preventDefault()
        // console.table({title,content,author})
        console.log("API URL = ",process.env.REACT_APP_API);
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`,{title,content,author})
        .then(response=>{
            Swal.fire('แจ้งเตือน','บันทึกข้อมูลเรียบร้อย','success')
            // const {title,content,author,slug} = response.data
            // setState({...state,title,content,author})
            setContent(content)
        }).catch(err=>{
            Swal.fire('แจ้งเตือน',err,'error')
        })
    }
    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>แก้ไขบทความ</h1>
            {showUpdateForm()}
        </div>
    )
}

export default Editcomponent;