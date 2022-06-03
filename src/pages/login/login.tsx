import { Button, Form, Input, Typography } from '@arco-design/web-react'
import { FC } from 'react'
import { checkLogin, LoginData } from '../../modal/auth'
const FormItem = Form.Item

const Login: FC = () => {
    const login = async (data: LoginData) => {
        try {
            checkLogin(data)
        } catch (error) { }

        window.location.href = ''
    }

    return (
        <div>
            <Typography.Title>登陆</Typography.Title>
            <Form onSubmit={login}>
                <FormItem field="name" label="用户名" required>
                    <Input />
                </FormItem>
                <FormItem field="password" label="密码" required>
                    <Input type="password" />
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        登陆
                    </Button>
                </FormItem>
            </Form>
        </div>
    )
}

export default Login
