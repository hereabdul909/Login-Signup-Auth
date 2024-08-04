import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [pswrd, setPswrd] = useState<string>('');
  const [err, setErr] = useState<string>('');

  const LogiIn = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!email || !pswrd) {
      setErr('All fields are required');
      return;
    }
    setErr('');
    signInWithEmailAndPassword(auth, email, pswrd)
      .then(() => {
        toast.success('Login successful!');
        navigate('/dashboard');
      })
      .catch((error: { message: string }) => {
        setErr(error.message);
      });
  };

  return (
    <section className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div className="p-4 border rounded-5 bg-dark text-white position-relative">
          <h2 className="text-center" style={{ fontFamily: 'monospace' }}>Sign In</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                onChange={(e) => setPswrd(e.target.value)}
              />
            </div>
            {err && <b className="text-danger">{err}</b>}
            <div className="mb-3">
              <button
                onClick={LogiIn}
                className="btn btn-primary form-control"
              >
                Sign In with Existing Account
              </button>
            </div>
          </form>

          <div className="d-flex justify-content-between align-items-center">
            <p>
              <IoMdArrowRoundBack /> <Link to="/">Back To Home</Link>
            </p>
            <p>
              Click Here <Link to="/signup">Register for New Account</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
