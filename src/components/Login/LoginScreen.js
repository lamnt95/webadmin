import React, { useState } from "react"
import { Button, Checkbox, Form } from 'semantic-ui-react'
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { actions } from "../../app-redux"
import { useRouter } from "next/router"

const Container = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height: 100vh;
  background: #2980b9; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #2980b9, #6dd5fa, #ffffff); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #2980b9, #6dd5fa, #ffffff); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`
const Wrapper = styled.div`
  width: 400px;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px 40px;
  -webkit-box-shadow: 5px 5px 11px -2px rgba(156,137,156,1);
  -moz-box-shadow: 5px 5px 11px -2px rgba(156,137,156,1);
  box-shadow: 5px 5px 11px -2px rgba(156,137,156,1);
`

export default function LoginScreen() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [accessToken, setAccesstoken] = useState();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmitSuccess = () => {
    router.push("/category")
  }

  const onSubmit = () => {
    dispatch(actions.auth.loginStart({ username, password, accessToken }, { onSuccess: onSubmitSuccess }))
  }

  return <Container>
    <Wrapper>
      <Form>
        <h1>Trang Admin</h1>
        <Form.Field>
          <label>Tên người dùng</label>
          <input placeholder='Tên người dùng' onChange={e => setUsername(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Mật khẩu</label>
          <input placeholder='Mật khẩu' onChange={e => setPassword(e.target.value)} type="password"/>
        </Form.Field>
        <Form.Field>
          <label>Nhập token (dành cho khi test đăng nhập)</label>
          <input placeholder='Nhập token' onChange={e => setAccesstoken(e.target.value)} />
        </Form.Field>
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </Wrapper>
  </Container>
}