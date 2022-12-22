import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

// Icons
import { MdEdit, MdSave } from "react-icons/md";
import { toast } from "react-hot-toast";

// Background image
import Search from "../Search/Search";
import socks from "../../../assets/images/socks.png";
import christmasTree from "../../../assets/images/christmasTree.png";



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
    <div className="flex-1 w-full h-screen overflow-hidden">
      <Search />
      <img
        src={socks}
        className="absolute -top-3 bg-cover w-[250px] right-5 animate-wiggle"
      />
      <img
        src={christmasTree}
        className="absolute -bottom-0 bg-cover w-[400px] -right-5"
      />
      <div className="w-full h-full sm:p-5 md:p-8 lg:p-10 xl:p-16">
        <div className="flex justify-between">
          <h1 className="sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-6xl font-poppins flex mb-14">
            {head}
          </h1>
          {note.length > 0 && (
            <h1 className="sm:text-lg md:text-xl lg:text-2xl xl:text-4xl 2xl:text-4xl font-poppins flex mt-3 md:mr-20 lg:mr-14 xl:mr-16 2xl:mr-8">
              {note.length}
            </h1>
          )}
        </div>
        <div className="w-full md:max-h-[300px] lg:max-h-[350px] xl:max-h-[540px] 2xl:max-h-[660px] grid gap-y-10 gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:pb-24 2xl:pb-16 sm:overflow-auto">
          {note.length > 0 ? (
            note.map((item, index) => (
              <div
                key={index}
                style={{ backgroundColor: `${item.color}` }}
                className={`w-60 h-60 rounded-[15px] group/item overflow-hidden relative transition-all duration-200 hover:cursor-pointer`}
              >
                <textarea
                  disabled={item.disabled}
                  ref={inputRef}
                  className="w-52 h-40 pl-5 pr-5 pt-5 mt-5 pb-5 outline-none border-none bg-transparent font-poppins placeholder:text-gray-500 text-black resize-none"
                  placeholder="Notunu yaz"
                  value={item?.descriptions}
                  onChange={(e) => handleWriteNote(e, item, index)}
                />
                <div className="w-full h-14 bottom-0 flex items-end justify-between">
                  <p className="font-poppins p-5 text-xs font-ultralight text-black">
                    {moment(item.date).calendar()}
                    </p>
                  {item.disabled ? (
                    <button
                      className="p-2 mb-3 mr-3 bg-black rounded-full group-hover/item:visible invisible transition duration-200 active:scale-110"
                      onClick={() => {
                        handleDisabledButton(item);
                      }}
                    >
                      <MdEdit className="text-[1em] text-white" />
                    </button>
                  ) : (
                    <button
                      className="p-2 mb-3 mr-3 bg-black rounded-full group-hover/item:visible invisible transition duration-200 active:scale-110"
                      onClick={() => {
                        handleUpdateNotes(item, index);
                      }}
                    >
                      <MdSave className="text-[1em] text-white" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="w-screen">
              <p className="text-4xl font-poppins text-gray-300">{text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
