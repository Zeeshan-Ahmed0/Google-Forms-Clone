import React, { useContext } from "react";
import { ThemeContext } from "../context/Themecontext";
import { FormContext } from "../context/Formcontext";
import { TitleContext } from "../context/Titlecontext";

const Header = () => {
  const themeValue = useContext(ThemeContext);
  const Forms = useContext(FormContext);
  const formDetail = useContext(TitleContext);

  const handleChange = (e) => {
    let titleData = {}
    if (e.target.name === "title") {
      titleData = {...formDetail.title, name: e.target.value}
    }
    else{
      titleData = {...formDetail.title, description: e.target.value}
    }
    formDetail.setTitle(titleData)
  }

  return (
    <div className={`w-full py-3 shadow-inner`}>
      <header className={`w-[90%] max-w-3xl m-auto rounded-lg border-t-[10px] shadow-lg border-l-[6px] ${themeValue.theme === "light" ? "bg-gray-100 border-violet-800 text-black" :  "bg-gray-700 border-violet-500 text-gray-100"}`}>
        <input
          onChange={(e) => handleChange(e)}
          type="text"
          name="title"
          value={formDetail.title.name}
          placeholder="Form Title"
          className="w-[96%] m-auto block h-12 mt-3 text-3xl bg-inherit p-1 outline-none"
        />
        <textarea
          type="text"
          onChange={(e)=>handleChange(e)}
          name="description"
          value={formDetail.title.description}
          placeholder="Form Description"
          className="mx-3 p-1 my-2 w-[96%] m-auto resize-none overflow-hidden text-sm outline-none max-h-40"
          rows="1"
          onInput={(e) => {
            e.target.style.height = "auto",
            e.target.style.height = `${e.target.scrollHeight}px`
          }}
          style={{overflow: "hidden"}}
        />
      </header>
    </div>
  );
};

export default Header;
