import React from "react";
import { IoMdContact } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import NotificationSettings from "./NotificationSettings";

const Settings = () => {
  return (
    <div className="bg-[#d4ebfc] max-lg:pt-16 w-full mx-auto h-full min-h-screen">
      <div className="p-6">
        <div className="bg-white pb-16 px-8 py-4 rounded-md border border-gray-300 flex flex-col w-full max-sm:gap-2">
          <div className="flex gap-x-16">
            <button className="flex items-center gap-x-1">
              <IoMdContact size={20} className="text-gray-500" />
              Profile
            </button>
            <button className="flex items-center gap-x-1 border-b-2 border-blue-500 pb-3 text-blue-500">
              <CiSettings size={20} />
              Setting
            </button>
          </div>
          <hr />
          <NotificationSettings />
        </div>
      </div>
    </div>
  );
};

export default Settings;
