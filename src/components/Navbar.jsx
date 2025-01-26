import { useContext, useState } from "react";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { ThemeContext } from "../context/Themecontext";
import { TitleContext } from "../context/Titlecontext";
import { FormContext } from "../context/Formcontext";
import { QuestionsContext } from "../context/QuestionsContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const forms = useContext(FormContext);
  const value = useContext(ThemeContext);
  const formDetail = useContext(TitleContext);
  const questions = useContext(QuestionsContext);
  const navigate = useNavigate();

  const handlePublish = () => {
    setConfirm(false);
    setLoading(true);
    let temp = forms.data.filter((item, index) => item.question);
    let updated = temp.filter(
      (item) => item.type !== "mcq" && item.type !== "checkbox" || item.options["Option 1"]
    );
    questions.setInfo(updated);
        
    navigate("./Questions");
  };

  return (
    <nav
      className={`h-[12vh] w-full flex justify-between items-center p-6 ${
        value.theme === "light"
          ? "bg-gray-100 text-black"
          : "bg-gray-700 text-gray-100"
      }`}
    >
      <div className="center gap-4 text-xl">
        <img
          src="https://www.gstatic.com/images/branding/product/1x/forms_512dp.png"
          alt="google-form"
          className="h-12"
        />
        <h1>{formDetail.title.name}</h1>
      </div>
      <div
        className={`center gap-8 text-2xl ${
          value.theme === "light" ? "text-gray-600" : "text-gray-200"
        }`}
      >
        <FontAwesomeIcon
          icon={faPalette}
          onClick={value.toggleTheme}
          className="cursor-pointer"
        />
        <Link to="/Preview">
          <FontAwesomeIcon icon={faEye} />
        </Link>
        <button
          onClick={() => setConfirm(true)}
          className="bg-violet-800 text-white text-base py-2 px-8 rounded-md font-semibold"
        >
          {" "}
          Publish{" "}
        </button>
        {confirm && (
          <div className="fixed inset-0 center bg-black bg-opacity-50 z-10 backdrop-blur-sm">
            <div className="bg-gradient-to-br from-gray-100 to-gray-500 p-8 rounded-lg text-center">
              <h2 className="text-2xl font-medium text-gray-700">
                Confirm Publish?
              </h2>
              <div className="flex justify-center gap-6 mt-5">
                <button
                  onClick={() => handlePublish()}
                  className="rounded-md bg-gradient-to-br from-gray-500 to-gray-900 px-6 py-2 text-white hover:scale-105"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirm(false)}
                  className="rounded-md bg-gradient-to-br from-gray-300 to-gray-700 px-6 py-2 text-white hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="h-12 w-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
