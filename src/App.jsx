import Header from "./components/Header";
import Forms from "./components/Forms";
import Navbar from "./components/Navbar";
import Questions from "./components/Questions";
import { ThemeContext } from "./context/Themecontext";
import { FormContext } from "./context/Formcontext";
import { TitleContext } from "./context/Titlecontext";
import { QuestionsContext } from "./context/QuestionsContext";
import { useState } from "react";
import AddButton from "./components/AddButton";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Preview from "./components/preview";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Header />
          <Forms />
          <AddButton />
        </>
      ),
    },
    {
      path: "/Preview",
      element: (
        <>
          <Preview />
        </>
      ),
    },
    {
      path: "/Questions",
      element: (
        <>
          <Questions />
        </>
      ),
    },
  ]);

  const [info, setInfo] = useState([])

  const [title, setTitle] = useState({
    name: "Untitled Form",
    description: "",
  });

  const [data, setData] = useState([
    {
      type: "mcq",
      question: "",
      required: true,
      answer: "",
      error : "",
      options: { "Option 1": "" },
    },
  ]);

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div
      className={`w-auto pb-10 min-h-screen ${
        theme === "light" ? "bg-gray-200" : "bg-gray-500"
      }`}
    >
      <QuestionsContext.Provider value={{info, setInfo}}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <FormContext.Provider value={{ data, setData }}>
            <TitleContext.Provider value={{ title, setTitle }}>
              <RouterProvider router={router} />
            </TitleContext.Provider>
          </FormContext.Provider>
        </ThemeContext.Provider>
      </QuestionsContext.Provider>
    </div>
  );
}

export default App;
