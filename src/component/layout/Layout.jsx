import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <nav>
        
        <p>
          {user.name}
        </p>
        <ul>
          <li>
            <Link to="/work">
              Lịch công tác
            </Link>
          </li>
          
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
