import React, { useState } from 'react'
import login from '../../api/login'
import "./login.css"
import Loading from '../Loading'

export default function LoginForm({ setLogin }) {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [caution, setCaution] = useState('')
  const [showModal, setShowModal] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setShowModal(true)
    const res = await login({ id, password })

    if (res.status === "ok") {
      localStorage.setItem('data', JSON.stringify(res.data))
      setLogin(true)

    } else {
      setCaution('sai thông tin')
    }
    setShowModal(false)

  }


  return (
    <div>
      <form className='login-form' onSubmit={handleLogin}>
        <h2 className='login-form--title'>Đăng nhập</h2>
        <input type="text" placeholder='id' value={id} onChange={e => {setId(e.target.value); setCaution('')}} />
        <input type="password" placeholder='password' value={password} onChange={e => {setPassword(e.target.value);setCaution('')}} />
        <button>Đăng nhập</button>
        <h3 className='caution'>{caution}</h3>
      </form>
      {showModal && <Loading />}
    </div>
  )
}
