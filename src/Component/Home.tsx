import React from 'react';
import { Link } from 'react-router-dom';
import back from './HomeBack.png';

const backImg: React.CSSProperties = {
  backgroundImage: `url(${back})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: '100%'
};

const Dashboard: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Authentication Check
          </Link>
          <div className="collapse navbar-collapse justify-content-end">
            <div className="navbar-nav">
              <Link className="nav-link" to="/login">
                <button className="btn btn-outline-light me-2">Login</button>
              </Link>
              <Link className="nav-link" to="/signup">
                <button className="btn btn-primary">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main style={backImg}>
        {/* Add any additional content here */}
      </main>
    </>
  );
}

export default Dashboard;
