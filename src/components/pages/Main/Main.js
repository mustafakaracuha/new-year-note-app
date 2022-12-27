import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

// Icons
import { MdEdit, MdSave } from "react-icons/md";
import { toast } from "react-hot-toast";

// Background image
import christmas from "../../../assets/images/top.svg";
import year from "../../../assets/images/bottom.svg";
import nightBlueCard from "../../../assets/images/blue.svg";
import yellowCard from "../../../assets/images/yellow.svg";
import greenCard from "../../../assets/images/green.svg";
import redCard from "../../../assets/images/red.svg";


// Search component
import Search from "../Search/Search";

// Redux
import {
  selectedColorSetNote,
  load,
} from "../../../store/features/noteSlice/noteSlice";

// Firebase
import db from "../../../utils/firebase";
import {
  collection,
  query,
  doc,
  getDocs,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";

export default function Main() {
  const [head, setHead] = useState(`Yeni yıla not`);
  const [text, setLoadingText] = useState("Notunu Oluştur");

  const { note } = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    checkAllNotes();
  }, []);


  const handleDisabledButton = (item) => {
    let updateNewNote = note.map((notes) => {
      return { ...notes };
    });
    let res = updateNewNote.find((a) => a.id === item.id);
    res.disabled = !res.disabled;
    dispatch(selectedColorSetNote(updateNewNote));
  };

  const checkAllNotes = async () => {
    setLoadingText("Notlar Yükleniyor...");
    const database = query(collection(db, "notes"),orderBy("date", "desc"));
    try {
      const docsSnap = await getDocs(database);
      const arr = [];
      docsSnap.forEach((doc) => {
        arr.push(doc.data());
      });
      dispatch(load(arr));
    } catch (error) {
      console.log(error);
    }
    setLoadingText("Notunu Oluştur");
  };

  const handleUpdateNotes = async (item, index) => {
    const q = query(collection(db, "notes"), where("id", "==", item.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docs) => {
      const data = {
        descriptions: item.descriptions,
        disabled: !item.disabled,
      };
      updateDoc(doc(db, "notes", docs.id), data)
        .then(() => {
          toast.success("Notunu kaydettim");
        })
        .catch((error) => {
          toast.error("Notunu kaydedemiyorum");
        });
    });
    handleDisabledButton(item);
  };

  const handleWriteNote = async (e, item, index) => {
    let updateNewNote = note.map((notes) => {
      return { ...notes };
    });
    let res = updateNewNote.find((a) => a.id === item.id);
    res.descriptions = e.target.value;
    dispatch(selectedColorSetNote(updateNewNote));
  };

  return (
    <div className="flex-1 w-full h-screen">
      <Search />
      <img
        src={christmas}
        className="max-sm:hidden absolute -top-3 bg-cover w-[300px] right-20 opacity-100 z-100"
      />
      <img
        src={year}
        style={note.length >= 10 ? {opacity: "0.5"} : {opacity: "1"}}
        className="max-sm:hidden max-md:hidden lg:block absolute bottom-0 bg-cover w-[350px] right-5 opacity-100 -z-50"
      />
      <div className="w-full h-full sm:p-5 md:p-8 lg:p-10 xl:p-16">
        <div className="flex justify-between">
          <h1 className="max-sm:mt-10 max-sm:ml-7 max-sm:text-3xl  max-md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-poppins font-light flex mb-14">
            {head}
          </h1>
          {note.length > 0 && (
            <h1 className="max-sm:text-2xl max-md:text-xl lg:text-2xl xl:text-4xl 2xl:text-4xl font-poppins flex max-sm:mt-11 max-sm:mr-8 mt-3 md:mr-20 lg:mr-14 xl:mr-16 2xl:mr-8">
              {note.length}
            </h1>
          )}
        </div>
        <div className="w-full max-sm:max-h-[540px] md:max-h-[300px] lg:max-h-[350px] xl:max-h-[540px] 2xl:max-h-[650px] grid gap-y-10 gap-5 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:pb-24 2xl:pb-16 max-sm:overflow-auto overflow-auto">
          {note.length > 0 ? (
            note.map((item, index) => (
              <div
                key={index}
                className={`max-sm:w-64 w-60 h-60 rounded-[15px] max-sm:ml-7 group/item overflow-hidden relative transition-all duration-200 hover:cursor-pointer`}
              > 
              <img
              src={item.color === "red" ? redCard : item.color === "yellow" ? yellowCard : item.color === "blue" ? nightBlueCard : item.color === "green" ? greenCard : ""}
              className="max-sm:hidden absolute top-0 bottom-0 left-0 w-auto right-0 -z-50"
              />
                <textarea
                  disabled={item.disabled}
                  ref={inputRef}
                  className="w-52 h-40 pl-5 pr-5 pt-5 mt-5 pb-5 outline-none border-none bg-transparent text-lg font-poppins font-normal text-white placeholder:text-white resize-none z-100"
                  placeholder="Notunu yaz"
                  value={item?.descriptions} 
                  onChange={(e) => handleWriteNote(e, item, index)}
                />
                <div className="w-full h-14 bottom-0 flex items-end justify-between">
                  <p className="font-poppins p-5 text-xs font-normal text-white z-50">
                    {moment(item.date).calendar()}
                    </p>
                  {item.disabled ? (
                    <button
                      className="p-2 mb-3 mr-3 bg-white rounded-full group-hover/item:visible invisible transition duration-200 active:scale-110 z-50"
                      onClick={() => {
                        handleDisabledButton(item);
                      }}
                    >
                      <MdEdit className="text-[1.2em] text-gray-600" />
                    </button>
                  ) : (
                    <button
                      className="p-2 mb-3 mr-3 bg-white rounded-full group-hover/item:visible invisible transition duration-200 active:scale-110 z-50"
                      onClick={() => {
                        handleUpdateNotes(item, index);
                      }}
                    >
                      <MdSave className="text-[1.2em] text-gray-600" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="w-screen">
              <p className="max-sm:text-2xl max-sm:ml-7 ml-2 text-4xl font-poppins text-gray-300">{text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
