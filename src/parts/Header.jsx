import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
export default function Header(props) {
   const ortherPage = props.ortherPage
  return (
    ortherPage === true ? ( <nav style={{backgroundColor: "green", padding: "5px 5px"}}>
      <div class="nav__logo">
        <img
          src="https://s.bonbanh.com/uploads/users/701283/salon/l_1678849916.jpg"
          alt="logo"
          style={{borderRadius: "50%", cursor: "pointer"}}
        />
      </div>
      <ul class="nav__links">
        <li class="link">
          <Link to="/">Trang chủ</Link>
        </li>
        <li class="link">
          <Link to="/">Gói dịch vụ</Link>
        </li>
        <li class="link">
          <Link to="/">Salon Oto</Link>
        </li>
        <li class="link">
          <Link to="/">liên hệ</Link>
        </li>
        <li class="link">
          <Link to="/">Tin tức</Link>
        </li>
      </ul>
      <div class="search">
        <input type="text" placeholder="Tìm kiếm" />
        <span>
          <i class="ri-search-line"></i>
        </span>
      </div>
      <Link to="/AccountProfile" class="login" style={{textDecoration: "none"}}>
        <span>
          <i class="ri-user-3-fill"></i>
        </span>
        Đào Duy Anh
      </Link>
    </nav>) : (
       <nav>
       <div class="nav__logo">
         <img
           src="https://s.bonbanh.com/uploads/users/701283/salon/l_1678849916.jpg"
           alt="logo"
           style={{borderRadius: "50%"}}
         />
       </div>
       <ul class="nav__links">
         <li class="link">
           <Link to="/">Trang chủ</Link>
         </li>
         <li class="link">
           <Link to="/">Gói dịch vụ</Link>
         </li>
         <li class="link">
          <Link to="/">Salon Oto</Link>
        </li>
         <li class="link">
           <Link to="/">liên hệ</Link>
         </li>
         <li class="link">
           <Link to="/">Tin tức</Link>
         </li>
       </ul>
       <div class="search">
         <input type="text" placeholder="Tìm kiếm" />
         <span>
           <i class="ri-search-line"></i>
         </span>
       </div>
       <Link to="/AccountProfile" class="login" style={{textDecoration: "none"}}>
         <span>
           <i class="ri-user-3-fill"></i>
         </span>
         Đào Duy Anh
       </Link>
     </nav>
    )
   
  );
}
