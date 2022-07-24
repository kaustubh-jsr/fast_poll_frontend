import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { PlusIcon, SparkleIcon } from "../assets/Icons";
import { OptionInput } from "../components";
import { useUniqueComponentId } from "../hooks/useUniqueComponentId";
import { isValidPollInputs } from "../utils";
import { createPoll as createPollApi } from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const getId = useUniqueComponentId();
  const [pollQuestion, setPollQuestion] = useState("");
  const [options, setOptions] = useState([
    { id: getId(), title: "" },
    { id: getId(), title: "" },
  ]);
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (val, id) => {
    setOptions((prev) =>
      prev.map((option) =>
        option.id === id ? { ...option, title: val } : option
      )
    );
  };

  const handleDelete = (id) => {
    console.log(options);
    setOptions((prev) => prev.filter((option) => option.id !== id));
  };

  const addOption = () => {
    console.log(options);
    setOptions((prev) => [...prev, { id: getId(), title: "" }]);
  };

  const createPoll = async (e) => {
    console.log(pollQuestion.trim());
    console.log(options.map((opt) => opt.title.trim()));
    const userInput = [
      pollQuestion.trim(),
      ...options.map((opt) => opt.title.trim()),
    ];
    if (!isValidPollInputs(userInput)) {
      setFormError(true);
      console.log("invalid inputs");
      return;
    }

    try {
      setLoading(true);
      const resp = await createPollApi(pollQuestion, options);
      setLoading(false);
      navigate(`new/${resp.data.pollId}`);
    } catch (e) {
      console.error(e);
      toast.error("Someting went wrong.");
    }
  };
  return (
    <div className="bg-gray-100 flex-1">
      <div className="p-4 sm:p-9 w-full md:max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold mb-3 text-gray-700">
            Create Poll{" "}
            <span role="img" aria-label="emoji">
              💡
            </span>
          </h1>
          <p className="text-gray-400 text-lg font-medium">
            Complete below fields to create a Poll
          </p>
        </div>

        <section className="my-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-500 mb-3">
              Poll Question
            </h3>
            <textarea
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              name="questions"
              className={`w-full p-4 text-lg font-medium text-gray-700 focus:ring-2 focus:ring-green-500 focus:drop-shadow-md
           outline-none rounded-md placeholder-gray-400 border resize-none ${
             formError && !pollQuestion.trim() && "ring-red-400 ring-2"
           }`}
              placeholder="Eg. What is your favorite color?"
            />
            {formError && !pollQuestion.trim() && (
              <span className="mt-0 text-sm text-red-500 font-medium">
                The poll question cannot be empty
              </span>
            )}
          </div>
        </section>
        <div className="w-full flex flex-col gap-3">
          {options.map((option, index) => (
            <OptionInput
              key={option.id}
              value={option.title}
              optionNumber={index + 1}
              onChange={(val) => handleChange(val, option.id)}
              onDelete={() => handleDelete(option.id)}
              showDelBtn={options.length > 2}
              error={formError}
            />
          ))}
          <div className="flex ">
            <button
              type="button"
              onClick={addOption}
              className="bg-blue-500 px-6 py-2 text-white text-lg font-semibold rounded-md focus:ring-4 flex items-center gap-3 hover:opacity-90"
            >
              <span>Add Another Option</span>
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        {/* {error && !value.trim() && (
        <span className="!mt-0 text-sm text-red-400 font-medium">
          This field can&#39;t be empty
        </span>
      )} */}
        <button
          type="button"
          onClick={createPoll}
          className="bg-green-500 mt-8 relative px-6 py-2 text-white text-lg font-semibold rounded-md focus:ring-4 flex items-center gap-3 hover:opacity-90"
          disabled={loading}
        >
          <span>Create Your Poll</span>
          <SparkleIcon className="h-5 w-5 text-yellow-300" />
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-md">
              <CircularProgress
                style={{ color: "white", height: "20px", width: "20px" }}
              />{" "}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export { Home };
