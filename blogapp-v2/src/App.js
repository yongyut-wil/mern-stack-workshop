import React from "react";
import "./App.less";
import { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import axios from "axios";
import { getUser, getToken } from "./components/pages/user/Login/authorize";
import BlogHeader from "./components/BlogHeader";
import Blogfooter from "./components/BlogFooter";

const { Content } = Layout;

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => alert(err));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "คุณแน่ใช่ไหม ?",
      text: "ที่ต้องการลบบทความนี้ !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ต้องการลบ !",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = async (slug) => {
    await axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        Swal.fire("ลบสำเร็จ!", response.data.message, "success");
        fetchData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <Layout>
        <BlogHeader />
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 20 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 20, minHeight: 380 }}
          >
            {blogs.map((blog, index) => (
              <div
                className="row"
                key={index}
                style={{ borderBottom: "1px solid siver" }}
              >
                <div className="col pt-3 pb-2">
                  <Link to={`/blog/${blog.slug}`}>
                    <h1>{blog.title}</h1>
                  </Link>

                  <p>{parse(blog.content.substring(0, 600))}</p>

                  <p className="text-muted">
                    ผู้เขียน : {blog.author} , เผยแพร่ :{" "}
                    {new Date(blog.createdAt).toLocaleString()}
                  </p>

                  {getUser() && (
                    <div>
                      <Link
                        className="btn btn-outline-success"
                        to={`/blog/edit/${blog.slug}`}
                      >
                        แก้ไขบทความ
                      </Link>

                      <Button
                        style={{ marginLeft: 10 }}
                        type="primary"
                        onClick={() => confirmDelete(blog.slug)}
                      >
                        ลบบทความ
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Content>

        <Blogfooter />
      </Layout>
    </div>
  );
}

export default App;
