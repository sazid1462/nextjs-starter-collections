import React, { useContext } from "react";
import {Form, Input, Checkbox, Icon, Button} from "antd";
import { AuthContext } from "../../contexts/AuthContextProvider";

const LoginForm = (props) => {

    const authContext = useContext(AuthContext);

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields(async (err, values) => {
            if (!err) {
                await authContext.loginRequest(values);
            }
        });
    };

    const { getFieldDecorator } = props.form;
    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit} className="login-form common-form">
                <h1>LOGIN</h1>
                <Form.Item>
                    {getFieldDecorator("email", {
                        rules: [   {   required: true,
                            message: "Please input your email!"
                        },
                            {   type: "email",
                                message: "Please input a valid email!"
                            }
                        ],
                    })(
                        <Input
                            placeholder="Enter your email"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {
                        rules: [{ required: true, message: "Please input your Password!" }],
                    })(
                        <Input
                            type="password"
                            placeholder="Enter your password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("remember", {
                        valuePropName: "checked",
                        initialValue: true,
                    })(<Checkbox className="login-checkbox">Remember me</Checkbox>)}
                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                    <Button
                        type="submit"
                        style={{
                            width: "100%",
                            display: "block",
                            background: "#8bc34a"
                        }}
                    >
                        <Icon spin={authContext.loading} type="login" />
                        LOGIN
                    </Button>
                </Form.Item>
            </Form>
            <style jsx global>
                {` 
                    .form-container {
                        background-image: url("/images/cse_sust.png");
                        background-position: center;
                        background-size: cover;
                        background-repeat: no-repeat;
                    }
                    .login-form {
                        max-width: 400px;
                        margin: 0px auto;
                        padding: 40px 0px;
                    }
                    .login-form h1 {
                        font-size: 25px;
                        white-space: nowrap;
                        text-align: center;
                        padding-bottom: 20px;
                    }
                    .login-form-forgot {
                        float: right;
                    }
                    .linkedin-login {
                        text-align: center;
                        margin-top: 20px;
                    }
                    @media only screen and (max-width: 576px) {
                         .login-form {
                            max-width: 330px;
                        }
                        .login-form h1 {
                            font-size: 22px;
                        }
                    }
                    @media only screen and (max-width: 359px) {
                         .login-form {
                            max-width: 270px;
                        }
                        .login-form h1 {
                            font-size: 20px;
                        }
                    }
                `}
            </style>
        </div>
    );
};
const WrappedLoginForm = Form.create({ name: "login" })(LoginForm);
export default WrappedLoginForm;
