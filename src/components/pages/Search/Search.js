import React from "react";
import { BiSearch } from "react-icons/bi";

export default function Search() {
  return (
    <div>
      <div className="max-sm:hidden flex mt-8 ml-16 items-center">
        <BiSearch className="text-[1.4em] text-gray-400" />
        <input
          disabled
          className=" w-80 bg-transparent pl-1 text-gray-400 placeholder:text-gray-400 outline-none font-poppins font-thin"
          placeholder="Ara"
        />
      </div>
      </div>
  );
}
