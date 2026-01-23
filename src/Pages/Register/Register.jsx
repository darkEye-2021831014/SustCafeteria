import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
const Register = () => {
  const {createUser}=use(AuthContext);
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);

    createUser(email,password)
    .then(result=>{
      const user=result.user;
      console.log(user);
      form.reset();
    }
    )
    .catch((error)=>{
      console.error(error);
    });
    
  };

  return (
    <div className=" h-[calc(100vh-80px)] flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleRegister}>
            <h1 className="font-bold text-xl text-center mb-5">Register to an Account</h1>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Password"
            />

            <button type="submit" className="btn btn-neutral mt-4 w-full">
              Register
            </button>
          </form>
          <p>Already have an account? Please <Link to="/login" className="text-red-400 hover:text-red-600">Login</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
