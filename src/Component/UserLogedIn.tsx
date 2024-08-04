import React, { useState, ChangeEvent, useEffect } from 'react';
import Avatar from './blank-profile-picture-973460_640.png';
import { FaCamera } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogedIn: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(Avatar);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSelectedImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || 'N/A');
      setUserEmail(user.email || 'N/A');
    }
  }, []);

  useEffect(() => {
    if (location.state?.fromLogin) {
      toast.success('Login successful!');
    }
  }, [location.state]);

  const handleImageClick = () => {
    const fileInput = document.getElementById('formFile') as HTMLInputElement;
    fileInput?.click();
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error: Error) => {
        console.error('Logout Error:', error.message);
      });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand">
            User Dashboard
          </div>
          <div className="collapse navbar-collapse justify-content-end">
            <div className="navbar-nav">
              <div className="nav-link">
                <button className="btn btn-primary me-2" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section className="d-flex justify-content-center align-items-center vh-100 text-center">
        <div className="col-md-4">
          <div className="p-4 border rounded-5 bg-dark text-white">
            <h2 className="text-center mb-3" style={{ fontFamily: 'monospace' }}>
              Account Overview
            </h2>
            <div className="mb-4 position-relative">
              <img 
                src={selectedImage} 
                className="rounded-circle m-2" 
                style={{ width: '100px'}} 
                alt="User Avatar" 
              />
              <input 
                style={{ cursor: 'pointer' }} 
                type="file"  
                id='formFile'
                className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                onChange={handleImageChange}
              />
              <FaCamera 
                className='position-absolute bottom-0 fs-4' 
                onClick={handleImageClick} 
                style={{ left: '19.6rem', cursor: 'pointer' }} 
              />
            </div>
            <h3>Welcome</h3>
            <div className="mb-3">
              <b className='mb-3 border-bottom'>{userName}</b>
              <p>Email: <b className='border-bottom'> {userEmail}</b></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserLogedIn;
