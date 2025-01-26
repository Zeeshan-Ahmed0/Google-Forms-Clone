import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/Themecontext";
import { FormContext } from "../context/Formcontext";
import { TitleContext } from "../context/Titlecontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { QuestionsContext } from "../context/QuestionsContext";
import Mcq from "./Mcq";
import {
  faCopy,
  faImage,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Forms = () => {
  const formDetail = useContext(TitleContext);
  const forms = useContext(FormContext);
  const themeValue = useContext(ThemeContext);

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    let temp = forms.data.map((item, index) =>
      index === i ? { ...item, [name]: value } : item
    );
    forms.setData(temp);
  };

  const handleCopy = (type) => {
    let newForm = {
      type: type,
      question: "",
      required: true,
      answer: "",
      error: "",
      options: { "Option 1": "" },
    };
    let updated = [...forms.data];
    updated.push(newForm);
    forms.setData(updated);
  };

  const handleDelete = (i) => {
    let temp = forms.data.filter((item, index) => index !== i);
    forms.setData(temp);
  };

  const handleRequire = (i) => {
    let temp = forms.data.map((item, index) =>
      index === i ? { ...item, required: !item.required } : item
    );
    forms.setData(temp);
  };

  const addImage = (e, i) => {
    let file = e.target.files[0];
    if (file) {
      file = URL.createObjectURL(file);
      let temp = forms.data.map((item, index) =>
        index === i ? { ...item, image: file } : item
      );
      forms.setData(temp);
    }
  };

  const removeImage = (i) => {
    let temp = forms.data.map((item, index) =>
      index === i ? { ...item, image: "" } : item
    );
    forms.setData(temp);
  };

  return (
    <main className="justify-center w-full grid grid-cols-[90%] gap-4 pt-3">
      {forms.data.map((item, index) => (
        <div
          key={index}
          id="form"
          className={`w-[100%] max-w-3xl m-auto p-6 border-l-[6px] border-blue-500 rounded-md shadow-lg ${
            themeValue.theme === "light"
              ? "bg-gray-100 text-black"
              : "bg-gray-700 text-gray-100"
          }`}
        >
          <header className="flex justify-between items-center">
            <input
              onChange={(e) => handleChange(e, index)}
              type="text"
              value={item.question}
              name="question"
              placeholder="Question"
              className="p-3 border-b border-gray-500 w-[60%] outline-none focus:border-blue-800 focus:border-b-[3px] transition duration-500"
            />
            <label htmlFor="image-input">
              <FontAwesomeIcon
                icon={faImage}
                className="text-2xl text-gray-500 cursor-pointer"
              />
            </label>
            <input
              type="file"
              id="image-input"
              onChange={(e) => addImage(e, index)}
              className="hidden"
            />
            <select
              name="type"
              onChange={(e) => handleChange(e, index)}
              className="flex justify-between w-[30%] p-3 border border-gray-300 rounded-md text-[0.92rem] cursor-pointer outline-none"
            >
              <option className="text-gray-700 bg-gray-200" value="mcq">
                Multiple Choice
              </option>
              <option className="text-gray-700 bg-gray-200" value="short">
                Short Answer
              </option>
              <option className="text-gray-700 bg-gray-200" value="paragraph">
                Paragraph
              </option>
              <option className="text-gray-700 bg-gray-200" value="checkbox">
                Checkboxes
              </option>
            </select>
          </header>
          {item.image && (
            <div className="w-[35%] hover:relative border-2 border-black m-2 flex justify-center items-center group">
              <FontAwesomeIcon
                icon={faClose}
                onClick={() => removeImage(index)}
                className="hidden absolute top-2 right-2 text-gray-400 h-7 w-7 cursor-pointer rounded-full bg-gray-600 transition group-hover:block"
              />
              <img src={item.image} className="p-2 max-h-72" />
            </div>
          )}

          {item.type === "mcq" && (
            <Mcq types="mcq" index={index} form={forms.data} />
          )}
          {item.type === "checkbox" && (
            <Mcq types="checkbox" index={index} form={forms.data} />
          )}
          {item.type === "short" && <Short value="Short" />}
          {item.type === "paragraph" && <Short value="Long" />}
          <footer className="flex justify-end gap-7 items-center text-xl pt-5">
            <FontAwesomeIcon
              onClick={() => handleCopy(item.type)}
              icon={faCopy}
              className="cursor-pointer"
            />
            <FontAwesomeIcon
              onClick={() => handleDelete(index)}
              icon={faTrashCan}
              className="cursor-pointer"
            />
            <div className="flex items-center">
              <p className="mr-4 text-lg">Required</p>
              <div
                onClick={() => handleRequire(index)}
                className={`w-14 h-8 flex items-center bg-blue-500 rounded-full p-1 cursor-pointer transition duration-300 ease-in-out ${
                  item.required ? "bg-blue-500" : "bg-gray-400"
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    item.required ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </div>
            </div>
          </footer>
        </div>
      ))}
    </main>
  );
};

export default Forms;

const Short = ({ value }) => {
  return (
    <>
      <section id="answer-container" className="shadow-md pb-12">
        <div id="option" className="flex items-center mt-5 gap-3">
          <p className="w-[50%] border-b border-gray-400 text-gray-500 p-2">
            {value}-answer-text
          </p>
        </div>
      </section>
    </>
  );
};
