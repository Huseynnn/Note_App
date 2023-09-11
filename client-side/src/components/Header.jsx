import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../public/vite.svg';

function Header() {
  return (
    <header>
        <Link to="/" className='logo'>
            <img src={logo} alt="ReactJS" /> React JS
        </Link>

        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
        </nav>  

    </header>
  )
}

export default Header
