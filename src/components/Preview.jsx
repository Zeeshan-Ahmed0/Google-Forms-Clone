import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/Themecontext";
import { FormContext } from "../context/Formcontext";
import { TitleContext } from "../context/Titlecontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCopy,
  faImage,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faClose,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";

const Preview = () => {
  const formDetail = useContext(TitleContext);
  const forms = useContext(FormContext);
  const themeValue = useContext(ThemeContext);

  return (
    <div>
      <nav
        className={`h-[12vh] w-full flex justify-between items-center p-6 shadow-xl ${
          themeValue.theme === "light"
            ? "bg-gray-100 text-black"
            : "bg-gray-700 text-gray-100 shadow-gray-800"
        }`}
      >
        <div className="flex gap-4 items-center">
          <Link to="/">
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-2xl text-gray-600"
            />
          </Link>
          <h1 className="text-xl font-semibold">Preview Mode</h1>
        </div>
        <div className="center gap-3 mr-3">
          <h2 className="font-semibold">Toggle Theme</h2>
          <FontAwesomeIcon
            icon={faPalette}
            onClick={themeValue.toggleTheme}
            className="cursor-pointer text-2xl"
          />
        </div>
      </nav>

      <header
        className={`w-[90%] max-w-3xl m-auto rounded-lg border-t-[10px] shadow-lg mt-8 ${
          themeValue.theme === "light"
            ? "bg-gray-100 border-violet-800 text-black"
            : "bg-gray-700 border-violet-500 text-gray-100"
        }`}
      >
        <h1 className="text-3xl my-4 pl-7">{formDetail.title.name}</h1>
        <p className="my-5 pl-7">{formDetail.title.description}</p>

        <p className="p-5 border-t-2 border-gray-300 text-red-500">
          * Indicates required question
        </p>
      </header>

      <main className="justify-center w-full grid grid-cols-[90%] gap-4 pt-3">
        {!!forms?.data?.length &&
          forms.data.map((item, index) => (
            <div
              key={index}
              id="form"
              className={`w-[100%] max-w-3xl m-auto p-6 border-l-[6px] border-blue-500 rounded-md shadow-lg ${
                themeValue.theme === "light"
                  ? "bg-gray-100 text-black"
                  : "bg-gray-700 text-gray-100"
              }`}
            >
              <h2 className="text-xl font-semibold inline mb-10">
                {"Q" + (index + 1) + ". " + item.question}{" "}
                {item.required && <p className="inline text-red-500">*</p>}
              </h2>
              {item.image && (
                <img src={item.image} className="p-2 max-h-80 my-3" />
              )}
              {item.type === "short" && (
                <input
                  type="text"
                  placeholder="Your Answer..."
                  className="border-b w-full border-gray-500 outline-none focus:border-blue-500 focus:border-b-2 transition duration-500 p-1 mt-5"
                />
              )}
              {item.type === "paragraph" && (
                <textarea
                  className="m p-2 w-full border border-gray-500 rounded focus:outline-none resize-none max-h-40 mt-5"
                  placeholder="Your Answer..."
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                  style={{ overflow: "hidden" }}
                ></textarea>
              )}
              {item.type === "mcq" && (
                <div className="flex flex-col gap-3 p-4">
                  {Object.entries(forms.data[index].options).map(
                    ([key, value], i) => {
                      return (
                        <label key={i} className="flex gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={index}
                            value={value}
                            className="w-4 cursor-pointer"
                          />
                          {value}
                        </label>
                      );
                    }
                  )}
                </div>
              )}
              {item.type === "checkbox" && (
                <div className="flex flex-col gap-3 p-4">
                  {Object.entries(forms.data[index].options).map(
                    ([key, value], i) => {
                      return (
                        <label key={i} className="flex gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name={index}
                            value={value}
                            className="w-4 cursor-pointer"
                          />
                          {value}
                        </label>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          ))}
      </main>
    </div>
  );
};

export default Preview;
