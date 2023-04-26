import { URL } from "./prop";

export default async function login(props) {
  let submitData = {
    type: "login",
    data: props,
  };

  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(submitData), // body data type must match "Content-Type" header
  });
  const data = await response.json();
  return data
}
