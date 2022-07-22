import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { getPoll as getPollApi } from "../api";
import { CircularProgress } from "@mui/material";

const PollCreated = () => {
  console.log("inside poll created");
  const navigate = useNavigate();
  const [poll, setPoll] = useState();
  const [isPollExists, setPollExists] = useState(true);
  const { id: pollId } = useParams();
  const ORIGIN = window.location.origin;
  const POLL_URL = `${ORIGIN}/poll/${pollId}`;
  const copyToClipboard = async (text) => {
    toast.promise(window.navigator.clipboard.writeText(text), {
      loading: "...",
      success: "Link copied to clipboard",
      error: "Something went wrong",
    });
  };

  useEffect(() => {
    const getPollData = async () => {
      try {
        const data = await getPollApi(pollId);
        if (data) {
          setPoll(data);
          toast.success("Poll created", { id: pollId });
        } else {
          setPollExists(false);
        }
      } catch {
        toast.error("something went wrong");
      }
    };
    getPollData();
  }, [pollId]);

  if (!isPollExists) {
    navigate("/");
  }

  if (!poll && isPollExists) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <CircularProgress
          style={{ color: "white", height: "50px", width: "50px" }}
        />{" "}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex-1 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-md border px-8 pt-8 pb-3 shadow-md">
        <div className="font-medium">
          The Link to your poll{" "}
          <span role="img" aria-label="below">
            👇
          </span>
        </div>
        <input
          className="w-full bg-gray-100 p-2 my-2 border rounded cursor-pointer transition-all focus:outline-none text-gray-600 hover:bg-gray-200"
          type="text"
          readOnly
          value={POLL_URL}
          onClick={() => copyToClipboard(POLL_URL)}
        />

        <div className="w-full flex justify-end mt-4 gap-6">
          <Link
            className="font-bold block hover:cursor-pointer text-purple-400 hover:text-purple-500 w-max"
            to={`/poll/${pollId}`}
          >
            Visit your poll
          </Link>
          {/* <Link
            className="font-bold block text-purple-400 hover:text-purple-500 w-max"
            to={`/poll/${pollId}/${poll.key}/admin`}>
            Visit admin page
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export { PollCreated };
