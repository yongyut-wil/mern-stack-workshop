import React from "react";
import App from "./App";
import Login from "./components/pages/user/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReadBlog from "./components/ReadBlog";
import FormCreate from "./components/FormCreate";
import FormEdit from "./components/FormEdit";

const BlogRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blog/:slug" element={<ReadBlog />} />
        <Route path="/create/" element={<FormCreate />} />
        <Route path="/blog/edit/:slug" element={<FormEdit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default BlogRoute;
