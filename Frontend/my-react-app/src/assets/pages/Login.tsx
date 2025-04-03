import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center bg-custom h-screen w-screen gap-4 px-8 py-6">
      <div className="flex flex-col items-center  gap-12 w-80 h-81">
        <p className="font-bold font-sans leading-[38px] tracking-[0%] text-[30px] h-[38px]">
          Welcome back!
        </p>
        <form action="#" className=" flex flex-col gap-6 w-full">
          <input
            type="text"
            name="uid"
            id="uid"
            placeholder="UID"
            className="w-full indent-1.5 p-2 border rounded-md border-gray-300"
          />

          <input
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            className="w-full indent-1.5 p-2 border rounded-md border-gray-300"
          />
        </form>
        <button
          type="submit"
          className="w-full max-w-[320px] h-auto min-h-[60px] p-[16px] px-[24px]  gap-[8px] rounded-[8px] border border-[#2B3A67] bg-[#2B3A67] text-white shadow-btnShadow  cursor-pointer text-lg font-semibold leading-[28px] tracking-[0%]"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
