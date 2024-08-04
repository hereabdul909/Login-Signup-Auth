import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { createUserWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { auth } from './Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [fname, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState<boolean>(false);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!fname || !email || !pass) {
      setError('All fields are required');
      return;
    }
    setError('');
    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, email, pass)
      .then(async (res: UserCredential) => {
        const user = res.user;
        await updateProfile(user, {
          displayName: fname
        });
        toast.success('Account Created Successfully!');
        setSubmitButtonDisabled(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setSubmitButtonDisabled(false);
      });
  };

  return (
    <section className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-4">
        <div className="p-4 border rounded-5 bg-dark text-white">
          <h2 className="text-center" style={{ fontFamily: 'monospace' }}>Sign Up</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">Name</label>
              <input
                type="text"
                id="firstname"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            {error && <b className="text-danger">{error}</b>}
            <div className="mb-3">
              <button
                className='btn btn-primary form-control'
                onClick={handleSubmit}
                disabled={submitButtonDisabled}
              >
                Create New Account
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-between align-items-center">
            <p><IoMdArrowRoundBack /> <Link to='/login'>Back To SignIn Page</Link></p>
            <p>Click Here if <Link to="/login">Already have an Account</Link></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
