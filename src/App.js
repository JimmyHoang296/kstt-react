import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./component/login/LoginForm";
import InputTable from "./component/inputTable/InputTable";
import Layout from "./component/layout/Layout";


export default function App() {
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter >
      <Routes>
        <Route
          path="/"
          element={!login ? <LoginForm setLogin={setLogin} /> : <Layout />}
        >
          <Route index element={<InputTable />} />
          {/* <Route path="searchLe" element={<SearchLe />} />
          <Route path="create" element={<Create />} />
          <Route path="customer" element={<Customer />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
