import React from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Layout } from "antd";
import { useState, useEffect } from "react";
import BlogHeader from "./BlogHeader";
import Blogfooter from "./BlogFooter";

const { Content } = Layout;

const ReadBlog = () => {
  const params = useParams();
  console.log(params);
  const [blog, setBlog] = useState("");
  const fetchData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/blog/${params.slug}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    // // eslint-disable-next-line
    fetchData();
  }, []);
  return (
    <>
      <Layout>
        <BlogHeader />
        <Content
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <h1>{blog.slug}</h1>
            {blog.content}
            <p className="text-muted">ผู้เขียน : {blog.author} ,</p>
            <p className="text-muted">
              เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
        </Content>
        <Blogfooter />
      </Layout>
    </>
  );
};

export default ReadBlog;
