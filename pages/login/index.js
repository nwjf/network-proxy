import style from './index.module.css';
import { Form, Button, Input} from 'antd';
import { useState, useCallback, useEffect } from 'react';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({ username: '', password: ''});

  useEffect(() => {
    const type = router.query.type;
    console.log('type', type);
    if (type === 'logout') {
      Cookie.remove('username');
      Cookie.remove('password');
      return;
    }
    const username = Cookie.get('username');
    const password = Cookie.get('password');
    if (username && password) {
      window.location.href = '/'
    }
  }, [router]);

  const onInputChange = useCallback((value, key) => {
    setFormData({ ...formData, [key]: value });
  }, [formData]);

  const onFinish = useCallback(() => {
    console.log('onFinish', formData);
    // 15 天
    Cookie.set('username', formData.username, { expires: 15 });
    Cookie.set('password', formData.password, { expires: 15 });
    window.location.href = '/'
  }, [formData]);

  return <>
    <style jsx global>
      {`
        * { margin: 0; padding: 0 }
        html, body { min-height: 100vh; background: #000; }
      `}
    </style>
    <div className={style.loginWrap}>
      <div className={style.formBox}>
        <div className={style.title}>统一登录平台</div>
        <img className={style.picture} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADABAMAAACg8nE0AAAAD1BMVEXBy9eGlqeTorG9yNSptcPYN5ilAAABVElEQVR42u3Y3Y2DMBAEYBNfAR6gANIBdHDpv6m7h9OtorAWMp6IjeYrgGHX/NibRERERERERETEs+HXlFjwLzHcALOk7gY8KZT7Z9YAQ1mHB17MhAXgLQN2EQpglQBwS/iC45vQIUqP4CK9xGYhdIjQI1SECLihYuEsgSkRAlClgDcEZFStnIfIFAUoQAERAjKq1ut/7BRwgZ9+PSDCxiv+3rS6fY9xAElwRTkE+sfYKAdxd5QQZxjijHMiDaT2mhRtKLg71ow1mPVHy4GG4yIi0kP++/VPa+ov3/Fk7BuyYceUernDMfa7PC9iAKjjFhzAOiKb5XR7SG164LC5w9NTN5Lu38yk/pvScH1iQoaj1wASTQgNam0SGjUUwCkBzQ4XwC0BJ1wiYAC4PdpwwkTqkLlAQMYpK2eNTVGAAhSgAAUoQAEKUIACFKAABShAAZ8c8AO1HXS7nTcqUQAAAABJRU5ErkJggg=="></img>
        <Form
          form={form}
          initialValues={formData}
          className={style.formBox}
          layout="vertical"
          onFinish={onFinish}>
          <Form.Item
            className={style.formItem}
            label="username"
            name="username"
            rules={[{ required: true, type: 'string', message: 'Please input your username!' }]}>
            <Input
              value={formData.username}
              placeholder="Please input your username"
              onInput={e => onInputChange(e.target.value, 'username')} />
          </Form.Item>
          <Form.Item
            className={style.formItem}
            label="password"
            name="password"
            rules={[{ required: true, type: 'string', message: 'Please input your password!' }]}>
            <Input
              value={formData.password}
              type="password"
              placeholder="Please input your password"
              onInput={e => onInputChange(e.target.value, 'password')} />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className={style.btn}
              htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </>
}