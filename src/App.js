import { useState } from "react";
import {  Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LoginForm from "./component/login/LoginForm";
import Home from "./component/home/Home";
import Job from "./component/job/Job";
export default function App() {
  const [login, setLogin] = useState(false);
  const user = JSON.parse(localStorage.getItem('data'))?.user.name||'Tên tài khoản'
  return (
    <>
      {!login&&<LoginForm setLogin={setLogin}/>}
      {login && <nav className="max-w-5xl w-screen p-1 mb-2 flex justify-around" >
        <ul className="flex gap-8 text-lg">
        <li ><Link className="hover: transform scale-150" to="/">Lịch làm việc</Link></li>
        <li><Link to="/job">Sự vụ</Link></li>
        </ul>
         <h2>{user}</h2>
        </nav>}
    
      {login &&
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/job" element={<Job/>}/>
        
      </Routes>}
    </>
  );
}
