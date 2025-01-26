import React from "react";
import { useContext } from "react";
import { FormContext } from "../context/Formcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faSquare } from "@fortawesome/free-regular-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Mcq = ({ types, index, form }) => {
  const forms = useContext(FormContext);

  const handleChange = (e, ind, i) => {
    const { value } = e.target;
    let option = Object.fromEntries(
      Object.entries(form[ind].options).map(([key, value], index) =>
        index === i ? [key, e.target.value] : [key, value]
      )
    );
    let temp = [...form];
    temp[ind] = { ...form[ind], options: option };
    forms.setData(temp);
  };

  const deleteOption = (Index, i) => {
    let temp = form.map((item, index) => {
      if (index === Index) {
        let filteredOptions = Object.fromEntries(
          Object.entries(item.options).filter(([key, value], ind) => ind !== i)
        );
        let updatedOptions = Object.fromEntries(
          Object.entries(filteredOptions).map(([key, value], index) => [
            `Option ${index + 1}`,
            value,
          ])
        );
        return { ...item, options: updatedOptions };
      }
      return item;
    });
    let updated = [...form];
    updated[index] = { ...updated[index], options: temp[Index].options };
    forms.setData(updated);
  };

  const addOption = (ind) => {
    let temp = form.map((item, index) =>
      index === ind
        ? {
            ...item,
            options: {
              ...item.options,
              [`Option ${Object.keys(item.options).length + 1}`]: "",
            },
          }
        : item
    );
    forms.setData(temp);
  };

  return (
    <>
      <section id="answer-container" className="shadow-md pb-12">
        {Object.entries(form[index].options).map(([key, value], i) => (
          <div key={i}>
            <div id="option" className="flex items-center mt-5 gap-3">
              <FontAwesomeIcon
                icon={types === "mcq" ? faCircle : faSquare}
                className="text-gray-400 text-xl"
              />
              <input
                type="text"
                name="mcqOption"
                placeholder={key}
                value={value}
                onChange={(e) => handleChange(e, index, i)}
                className="w-[90%] p-1 border-b-2  outline-none focus:border-blue-600 transition duration-500"
              />
              {i > 0 && (
                <FontAwesomeIcon
                  onClick={() => deleteOption(index, i)}
                  icon={faClose}
                  className="text-gray-400 text-2xl cursor-pointer hover:text-gray-600 hover:scale-110"
                />
              )}
            </div>
          </div>
        ))}
        <div id="option" className="flex items-center mt-5 gap-3">
          <FontAwesomeIcon
            icon={types === "mcq" ? faCircle : faSquare}
            className="text-gray-400 text-xl"
          />
          <button
            onClick={() => addOption(index)}
            className="text-blue-500 font-semibold text-sm"
          >
            Add Option
          </button>
        </div>
      </section>
    </>
  );
};

export default Mcq;
