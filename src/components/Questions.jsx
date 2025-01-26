import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/Themecontext";
import { FormContext } from "../context/Formcontext";
import { TitleContext } from "../context/Titlecontext";
import { QuestionsContext } from "../context/QuestionsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faArrowLeft,
  faCircleCheck,
  faCircleExclamation,
  faPalette,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";

const Questions = () => {
  const [done, setdone] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [valid, setvalid] = useState(false);
  const formDetail = useContext(TitleContext);
  const forms = useContext(FormContext);
  const themeValue = useContext(ThemeContext);
  const questions = useContext(QuestionsContext);

  const handleChange = (e, i) => {
    if (!submit) {
      const { name, value, type, checked } = e.target;
      let temp = questions.info.map((item, index) => {
        if (index === i) {
          if (type === "checkbox") {
            const newAnswer = item.answer || [];
            return {
              ...item,
              answer: checked
                ? [...newAnswer, value]
                : newAnswer.filter((val) => val !== value),
            };
          } else if (type === "radio") {
            return { ...item, answer: forms.data[i].options[value] };
          }
          return { ...item, answer: value };
        }
        return item;
      });
      questions.setInfo(temp);
    }
  };

  const resetForm = () => {
    let temp = questions.info.map((item) => {
      if (Array.isArray(item.answer)) {
        return { ...item, answer: [] };
      }
      return { ...item, answer: "" };
    });
    questions.setInfo(temp);
  };

  const handleValid = () => {
    let temp = questions.info.map((item, index) =>
      !item.answer && item.required
        ? { ...item, error: "This question is required" }
        : { ...item, error: "" }
    );
    questions.setInfo(temp);
    if (temp.every((item) => item.error === "")) {
      setvalid(true);
    } else {
      setvalid(false);
    }
  };

  const handleSubmit = () => {
    setvalid(false);
    setsubmit(true);
    setdone(true);
    setTimeout(() => {
      setdone(false);
    }, 2000);
  };

  return (
    <div>
      <nav className="flex justify-between items-center px-12 p-5">
        <Link to="/">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={`text-3xl ${
              themeValue.theme == "light" ? "text-gray-600" : "text-gray-300"
            }`}
          />
        </Link>
        <div
          className={`center gap-3 mr-3 ${
            themeValue.theme == "light" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          <h2 className="font-semibold">Toggle Theme</h2>
          <FontAwesomeIcon
            icon={faPalette}
            onClick={themeValue.toggleTheme}
            className="cursor-pointer text-2xl"
          />
        </div>
      </nav>

      <header
        className={`w-[90%] max-w-3xl m-auto rounded-lg border-t-[10px] shadow-lg pb-3 ${
          themeValue.theme === "light"
            ? "bg-gray-100 border-violet-800 text-black"
            : "bg-gray-700 border-violet-500 text-gray-100"
        }`}
      >
        <h1 className="text-3xl my-4 pl-7">{formDetail.title.name}</h1>
        <p className="my-5 pl-7">{formDetail.title.description}</p>

        {!submit && (
          <p className="p-5 border-t-2 border-gray-300 text-red-500">
            * Indicates required question
          </p>
        )}
      </header>

      <main className="justify-center w-full grid grid-cols-[90%] gap-4 pt-3">
        {questions.info.map((item, index) => (
          <div
            key={index}
            id="form"
            className={`w-[100%] max-w-3xl m-auto p-6 rounded-md shadow-lg ${
              themeValue.theme === "light"
                ? "bg-gray-100 text-black"
                : "bg-gray-700 text-gray-100"
            }
            ${item.error && "border border-red-500"}`}
          >
            <h2 className="text-xl font-semibold inline mb-10">
              {"Q" + (index + 1) + ". " + item.question}{" "}
              {item.required && !submit && (
                <p className="inline text-red-500">*</p>
              )}
            </h2>
            {item.image && (
              <img src={item.image} className="p-2 max-h-80 my-3" />
            )}
            {submit && (
              <p className="text-sm text-blue-400 pt-5">Your Answer:</p>
            )}

            {item.type === "short" && (
              <input
                onChange={(e) => handleChange(e, index)}
                value={item.answer || ""}
                type="text"
                placeholder="Your Answer..."
                className="border-b w-full border-gray-500 outline-none focus:border-blue-500 focus:border-b-2 transition duration-500 p-1 mt-5"
              />
            )}
            {item.type === "paragraph" && (
              <textarea
                onChange={(e) => handleChange(e, index)}
                value={item.answer || ""}
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
                          onChange={(e) => handleChange(e, index)}
                          value={key}
                          checked={item.answer === value}
                          type="radio"
                          name={index}
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
                          onChange={(e) => handleChange(e, index)}
                          value={value}
                          checked={item.answer && item.answer.includes(value)}
                          className="w-4 cursor-pointer"
                        />
                        {value}
                      </label>
                    );
                  }
                )}
              </div>
            )}
            {item.error && (
              <div className="text-red-500 text-sm flex gap-2 items-center pl-4 pt-3">
                <FontAwesomeIcon icon={faCircleExclamation} />
                {item.error}
              </div>
            )}
          </div>
        ))}

        {!submit && (
          <div className="flex justify-between w-[90%] max-w-3xl m-auto">
            <button
              onClick={() => handleValid()}
              className="py-2 px-7 font-semibold bg-violet-600 text-white rounded-md"
            >
              Submit
            </button>
            <button
              onClick={() => resetForm()}
              className="py-2 px-5 text-violet-500 font-semibold"
            >
              Clear Form
            </button>
          </div>
        )}

        {valid && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white p-5 rounded-2xl text-center space-y-4">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-6xl text-red-500 p-5"
              />
              <p className="text-lg font-medium px-8">
                Are you sure you want to submit the form?
              </p>
              <div className="flex gap-8 justify-center">
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-800"
                >
                  Yes, I'm Sure
                </button>
                <button
                  onClick={() => setvalid(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {done && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white p-3 rounded-2xl text-center">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-6xl text-green-500 p-5"
              />
              <p className="text-lg font-medium px-8 pb-6">
                Form Submitted Successfully!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Questions;
