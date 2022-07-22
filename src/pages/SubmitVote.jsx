import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Option } from "../components";
import { getPollData as getPollDataApi, castVote as castVoteApi } from "../api";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import { ChevronRight } from "../assets/Icons";
const SubmitVote = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(-1);
  const [voteCasted, setVoteCasted] = useState(false);
  const [userVotes, setUserVotes] = useLocalStorage("userVotes", []);
  const [loading, setLoading] = useState(true);
  const { id: pollId } = useParams();
  const [poll, setPoll] = useState({
    question: "Question Loading...",
    options: [{ opt_id: 1, title: "Option Loading...", votes: 0 }],
  });
  const [isPollExists, setIsPollExists] = useState(true);

  useEffect(() => {
    setLoading(true);
    // get vote if casted from the local storage
    console.log(userVotes);
    const vote = userVotes.find((vote) => vote.poll_id === parseInt(pollId));
    console.log(`got vote from local storage as ${vote}`);
    (async () => {
      try {
        const resp = await getPollDataApi(pollId);
        setPoll(resp.poll);
        setIsPollExists(resp.isPollExists);
      } catch (e) {
        toast.error("Something went wrong. Please try later");
        console.error(e);
      }
    })();
    // if vote is cast set vote casted to true, and redirect to results page
    if (vote) {
      setVoteCasted(true);
      navigate(`/poll/results/${pollId}`, { replace: true });
    }

    setLoading(false);
  }, [pollId, userVotes, navigate]);

  if (loading) {
    return (
      <div className="bg-gray-100 flex-1 flex items-center justify-center">
        <CircularProgress
          style={{ color: "white", height: "50px", width: "50px" }}
        />{" "}
      </div>
    );
  }

  const handleVote = async (id) => {
    if (voteCasted) {
      toast.error("Already Voted");
      return;
    }
    if (id === -1) {
      toast.error("Select an option");
      return;
    }

    toast.promise(castVoteApi(pollId, id), {
      success: () => {
        setUserVotes([...userVotes, { poll_id: parseInt(pollId), opt_id: id }]);
        return `Vote casted`;
      },
      loading: "Casting vote...",
      error: (err) => {
        console.error(err.message);
        return "Unable to submit, try again";
      },
    });
    setVoteCasted(true);
  };
  return (
    <div className="bg-gray-100 flex-1 text-gray-800">
      <div className="w-full sm:w-11/12 max-w-3xl mx-auto p-4 mt-8">
        <h2 className="text-2xl font-bold">{poll?.question}</h2>
        <div className="mt-8 flex flex-col gap-5 items-center justify-center">
          {poll?.options.map((option) => (
            <Option
              key={option.opt_id}
              title={option.title}
              isSelected={option.opt_id === selectedOption}
              onSelect={() => setSelectedOption(option.opt_id)}
            />
          ))}
        </div>

        <div className="mt-8 w-full flex gap-3">
          <button
            type="button"
            onClick={() => handleVote(selectedOption)}
            disabled={voteCasted}
            className="bg-green-500 relative px-6 py-2 text-white text-sm sm:text-lg font-semibold rounded-md focus:ring-4 flex items-center gap-3 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span>Submit your Vote</span>
            {false && (
              <span className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-md">
                <CircularProgress
                  style={{ color: "white", height: "20px", width: "20px" }}
                />{" "}
              </span>
            )}
          </button>
          <Link to={`/poll/result/${pollId}`} className="ml-auto">
            <div className="relative inline-flex rounded-md shadow-sm">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border-2 border-gray-200 text-sm sm:text-lg leading-6 font-medium rounded-md text-gray-500 bg-white hover:text-purple-700 focus:border-purple-300 transition ease-in-out duration-150"
              >
                View Results
                <span>
                  <ChevronRight className="h-6 w-6 text-gray-500 ml-2" />
                </span>
              </button>
              {voteCasted && (
                <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500" />
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export { SubmitVote };
