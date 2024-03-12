import React from 'react'
import "./HeaderSalon.scss"
import {Link, useNavigate} from "react-router-dom"

export default function HeaderSalon() {
  const navigate = useNavigate()
  const backListSalon = () =>{
     navigate("/listSalon")
  }
  return (
    <div className='container-header'>
        <div className='back-home'>
           <i class="fa-solid fa-arrow-left" onClick={backListSalon}></i>
        </div>
        <div className='logo' style={{ backgroundImage: `url(https://bizweb.dktcdn.net/100/437/558/themes/836129/assets/logo.png?1699270212851.jpg)`,  }}>
            
        </div>
        <div className='main-menu'>
           <ul>
            <Link to = "/salonOto/:123" className='item-menu'>
                 Trang chủ
            </Link>
            <Link className='item-menu'>
                 Giới thiệu
            </Link>
            <Link className='item-menu'>
                 Tin tức
            </Link>
            <Link className='item-menu'>
                 Dịch vụ
            </Link>
            <Link className='item-menu'>
                 Bảo dưỡng
            </Link>
            <Link className='item-menu'>
                 Liên hệ
            </Link>
           </ul>
        </div>
    </div>
  )
}
