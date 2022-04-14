import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getUser, getToken } from "./pages/user/Login/authorize";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BlogHeader from "./BlogHeader";
import Blogfooter from "./BlogFooter";
import { Form, Input, Button, Radio, Layout } from "antd";
const { TextArea } = Input;
const { Content } = Layout;
const FormCreate = () => {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  let navigate = useNavigate();
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  });
  const { title, author } = state;

  const [content, setContent] = useState("");

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitContent = (event) => {
    setContent(event);
  };

  // const submitForm = (e) => {
  //   e.preventDefault();
  //   // console.table({title,content,author})
  //   console.log("API URL = ", process.env.REACT_APP_API);
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API}/create`,
  //       { title, content, author },
  //       {
  //         headers: {
  //           authorization: `Bearer ${getToken()}`,
  //         },
  //       }
  //     )

  //     .then((response) => {
  //       Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
  //       setState({ ...state, title: "", author: "" });
  //       setContent("");
  //       console.log(response);
  //     })
  //     .catch((err) => {
  //       Swal.fire("แจ้งเตือน", err.response.data.error, "error");
  //     });
  // };
  const [formsubmit] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values);
    await axios
      .post(`${process.env.REACT_APP_API}/create`, values, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        Swal.fire("แจ้งเตือน", "บันทึกข้อมูลเรียบร้อย", "success");
        formsubmit.resetFields();
        console.log(response);
      })
      .catch((err) => {
        Swal.fire("แจ้งเตือน", err.response.data.error, "error");
      });
  };

  useEffect(() => {
    !getUser() && navigate("/login");
  }, []);
  useEffect(() => {
    formsubmit.setFieldsValue({ author: author });
  }, [author]);

  return (
    <div>
      <BlogHeader />
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Form
            form={formsubmit}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            initialValues={{
              size: componentSize,
            }}
            onValuesChange={onFormLayoutChange}
            size={componentSize}
            onFinish={onFinish}
          >
            <Form.Item label="ปรับขนาดฟอร์มข้อมูล" name="size">
              <Radio.Group>
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="ชื่อบทความ"
              name="title"
              onChange={inputValue("title")}
            >
              <Input value={title} />
            </Form.Item>
            <Form.Item label="รายละเอียด" name="content">
              <TextArea rows={6} onChange={submitContent} />
            </Form.Item>
            <Form.Item label="ผู้แต่ง" name="author">
              <Input />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 4,
                span: 8,
              }}
            >
              <Button type="primary" htmlType="submit">
                บันทึก
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Blogfooter />
    </div>
  );
};

export default FormCreate;
