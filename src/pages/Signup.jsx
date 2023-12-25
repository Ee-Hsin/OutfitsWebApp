// Signup.jsx
import React from 'react';
import bgImg from '../assets/img1.jpg';
import { useForm } from 'react-hook-form';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <section>
      <div className="register">
        <div className="col-1">
          <h2>Sign Up</h2>
          <span>Register and enjoy the service</span>

          <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("username")} placeholder='Username' />
            <input type="password" {...register("password")} placeholder='Password' />
            <input type="password" {...register("confirmpwd")} placeholder='Confirm Password' />
            <input type="text" {...register("mobile", { required: true, maxLength: 10 })} placeholder='Mobile Number' />
            {errors.mobile?.type === "required" && "Mobile Number is required"}
            {errors.mobile?.type === "maxLength" && "Max Length Exceeded"}
            <button className='btn' type="submit">Sign Up</button>
          </form>
        </div>
        <div className="col-2">
          <img src={bgImg} alt="" />
        </div>
      </div>
    </section>
  );
}

export default Signup;
