import { json } from "react-router-dom";
import { URL } from "./prop";

export default async function submitWork(props) {
  let submitData = {
    type: "submitWorks",
    data: props,
  };

  console.log (JSON.stringify( submitData))
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(submitData), // body data type must match "Content-Type" header
  });
  const data = await response.json();
  alert ('Cập nhật thành công')
  return data
}
