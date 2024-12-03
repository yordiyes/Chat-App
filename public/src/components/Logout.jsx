import axios from 'axios'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { BiPowerOff } from "react-icons/bi";

export default function Logout() {
    const navigate = useNavigate();
    const handleClick = async ()=> {
        localStorage.clear();
        navigate("/login")
    }
  return (
    <Button onClick={handleClick}>
        <BiPowerOff />
    </Button>
  )
}

const Button = styled.button`
    display: flex;
    justfy-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #9a86f3;
    cursor: pointer;
    svg{
        font-size: 1.3rem;
        color: #ebe7ff
    }
`;