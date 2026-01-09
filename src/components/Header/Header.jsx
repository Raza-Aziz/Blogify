import React from "react";
import { Container, Logo, LogOutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-[#f9fef7]">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo className="w-40" />
            </Link>
          </div>
          <ul className="flex ml-auto mt-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="text-xl font-[Poppins] cursor-pointer font-semibold inline-bock px-6 py-2 duration-200 hover:bg-[#e2f6e2] rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null,
            )}
            {/* If user is authenticated, then show LogOutBtn */}
            {authStatus && (
              <li>
                <LogOutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
