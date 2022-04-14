import { useNavigate, Link } from "react-router-dom";
import { getUser, logout } from "./pages/user/Login/authorize";
import { Layout, Menu, Button } from "antd";
// import React, { useState, useEffect } from "react";

const { Header } = Layout;

const BlogHeader = () => {
  let navigate = useNavigate();

  return (
    <>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link to="/">หน้าแรก</Link>
          </Menu.Item>
          {getUser() && (
            <li className="nav-item pr-3 pt-3 pb-3">
              <Menu.Item key="2">
                <Link to="/create">เขียนบทความ</Link>
              </Menu.Item>
            </li>
          )}

          {!getUser() && (
            <li className="nav-item pr-3 pt-3 pb-3">
              <Link to="/login" className="nav-link">
                <Menu.Item key="3">เข้าสู่ระบบ</Menu.Item>
              </Link>
            </li>
          )}

          {getUser() && (
            <li className="nav-item pr-3 pt-3 pb-3">
              <Menu.Item key="4">
                <Button
                  type="link"
                  onClick={() => logout(() => navigate("/login"))}
                >
                  ออกจากระบบ
                </Button>
              </Menu.Item>
            </li>
          )}
        </Menu>
      </Header>
    </>
  );
};

export default BlogHeader;
