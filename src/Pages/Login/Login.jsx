import React, { use } from 'react';
import { Link, Navigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
const Login = () => {

    const {signInUser,signInWithGoogle}=use(AuthContext);

    const handleLogin=(event)=>{
        event.preventDefault();
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;
        // console.log(email,password);

        signInUser(email,password)  
        .then(result=>{
            const user=result.user;
            console.log(user);
            form.reset();
            Navigate(location?.state || "/");
        }
        )
        .catch((error)=>{
            console.error(error);
        }); 
    };
    const handleSignInWithGoogle=()=>{
        signInWithGoogle()
        .then(result=>{
            const user=result.user;
            console.log(user);
            Navigate(location?.state || "/");
        })
        .catch(err=>console.log(err));
    }


    return (
        <div className="h-[calc(100vh-80px)] flex items-center justify-center bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <form >
            <h1 className="font-bold text-xl text-center mb-5">Login to an Account</h1>
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
              Login
            </button>

            
          </form>
          {/* Google */}
<button className="btn bg-white text-black border-[#e5e5e5]" onClick={handleSignInWithGoogle}>
  <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
  Login with Google
</button>
          <p>New to this website? Please <Link to="/register" className="text-red-400 hover:text-red-600">Register</Link> </p>
        </div>
      </div>
    </div>
    );
};

export default Login;