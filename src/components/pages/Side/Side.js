import React from "react";
import { useSelector, useDispatch } from "react-redux";


import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import toast from 'react-hot-toast';

import { AiFillPlusCircle } from "react-icons/ai";
import { RxDotFilled } from "react-icons/rx";


import db from '../../../utils/firebase';
import { collection, addDoc } from "firebase/firestore"; 


import {
  toggleNoteColor,
  selectAndCreateNote,
} from "../../../store/features/noteSlice/noteSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { isCreateNoteColor } = useSelector((state) => state.note);

  const handleNoteViewColor = () => {
    dispatch(toggleNoteColor());
  };

  const selectAndCreateColorNote = async (color) => {
    let noteData = {
      id: uuidv4(),
      descriptions: "",
      favorite: false,
      disabled: false,
      date: moment(new Date).format(),
      color: color
    };
    try {
      await addDoc(collection(db, "notes"), noteData);
      toast.success("Notunu ekledim")
      dispatch(selectAndCreateNote(noteData));
    } catch (e) {
      toast.error("Üzgünüm notunu ekleyemedim")
    }
  };

  return (
    <div className="w-[80px] h-screen border-r border-gray-200 pt-8 text-center">
      <button onClick={handleNoteViewColor}>
        <AiFillPlusCircle className="text-[3em] transition ease-in-out duration-300 active:scale-110" />
      </button>
      {isCreateNoteColor && (
        <>
          <RxDotFilled
            onClick={() => selectAndCreateColorNote("blue")}
            className="text-[4em] max-sm:ml-2 ml-2 transition text-[#0069AA] ease-in-out duration-200 hover:scale-125 active:scale-110 cursor-pointer"
          />
          <RxDotFilled
            onClick={() => selectAndCreateColorNote("green")}
            className="text-[4em] max-sm:ml-2 ml-2 transition text-[#056B22] ease-in-out duration-200 hover:scale-125 active:scale-110 cursor-pointer"
          />
          <RxDotFilled
            onClick={() => selectAndCreateColorNote("red")}
            className="text-[4em] max-sm:ml-2 ml-2 transition text-[#C63030] ease-in-out duration-200 hover:scale-125 active:scale-110 cursor-pointer"
          />
          <RxDotFilled
            onClick={() => selectAndCreateColorNote("yellow")}
            className="text-[4em] max-sm:ml-2 ml-2 transition text-[#CC9600] ease-in-out duration-200 hover:scale-125 active:scale-110 cursor-pointer"
          />
        </>
      )}
    </div>
  );
}
