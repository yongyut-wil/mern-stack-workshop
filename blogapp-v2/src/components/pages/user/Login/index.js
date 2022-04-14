import React from "react";
// import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { authenticate } from "./authorize";
import BlogHeader from "../../../BlogHeader";
import BlogFooter from "../../../BlogFooter";
import { Layout, Form, Input, Button } from "antd";
const { Content } = Layout;

const Login = () => {
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log(values);
    await axios
      .post(`${process.env.REACT_APP_API}/login`, values)
      .then((response) => {
        //login สำเร็จ
        authenticate(response, () => navigate("/"));

        console.log(response);
      })
      .catch((err) => {
        Swal.fire("แจ้งเตือน", err.response.data.error, "error");
        navigate("/login");
      });
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // useEffect(() => {
  //   getUser() && navigate("/");
  // }, []);

  return (
    <>
      <Layout>
        <BlogHeader />
        <Content
          className="site-layout"
          style={{ padding: "50px 50px 50px 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 30,
              minHeight: 380,
              align: "center",
            }}
          >
            <div
              className="site-layout-background"
              style={{ padding: "20 20 20 20", textAlign: "center" }}
            >
              <h1>เข้าสู่ระบบ | Admin</h1>

              <Form
                form={form}
                name="basic"
                labelCol={{
                  span: 10,
                }}
                wrapperCol={{
                  span: 6,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 10,
                    span: 10,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    เข้าสู่ระบบ
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Content>
        <BlogFooter />
      </Layout>
    </>
  );
};

export default Login;
