import React from 'react';
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import Cookies from "js-cookie";
import {useState} from "react";
export default function logout() {
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      window.location.reload();
      toast.success("Logout Successfully!");
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Failed to Logout!");
    }
  };
    return (
        <>
        <div className='w-[4%] bg-slate-950 text-white flex flex-col justify-end'>
            <div className="p-3 align-bottom">
                <button>
                    <TbLogout2 className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300"
                     onClick={handleLogout}/>
                </button>
            </div>
        </div>
        </>
    );
}