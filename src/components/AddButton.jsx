import React, { useContext } from "react";
import { FormContext } from "../context/Formcontext";

const AddButton = () => {
  const forms = useContext(FormContext);

  const addForm = () => {
    let temp = {
      type: "mcq",
      question: "",
      required: true,
      answer : "",
      error : "",
      options:{"Option 1": "" },
    };
    let updated = [...forms.data];
    updated.push(temp);
    forms.setData(updated);
  };

  return (
    <div>
      <button
        onClick={() => addForm()}
        className="text-lg fixed bottom-[2rem] right-[2rem] p-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-[0_0px_30px_0px_rgba(119,12,47,0.8)] rounded-full hover:bg-gradient-to-bl hover:from-yellow-800 hover:via-violet-800 hover:to-red-800"
      >
        Add Form
      </button>
    </div>
  );
};

export default AddButton;
