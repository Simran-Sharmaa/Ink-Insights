import React from 'react'
import authService from "../../appwrite/auth"
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = ()=>{
        authService.logout().then(()=>{dispatch(logout())});
        navigate('/login')
    }
    return (
        <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default LogoutBtn