import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPollData } from "../api";
import { TelegramIcon, TwitterIcon, WhatsappIcon } from "../assets/SocialIcons";
import { OptionProgress } from "../components";
import { QRCodeModalButton } from "../components/QRCodeModalButton";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LayoutGroup } from "framer-motion";
const PollResults = () => {
  const navigate = useNavigate();
  const { id: pollId } = useParams();
  const [loading, setLoading] = useState(true);
  const [userOption, setUserOption] = useState();
  const [userVotes] = useLocalStorage("userVotes", []);
  const localEndpoint = `ws://127.0.0.1:8000/ws/poll_results`;
  const prodEndpoint = "wss://fast-poll-backend.herokuapp.com/ws/poll_results";
  let client;

  const [poll, setPoll] = useState({
    question: "Question Loading...",
    options: [
      { opt_id: 1, title: "Option Loading...", votes: 0 },
      { opt_id: 2, title: "Option Loading...", votes: 0 },
      { opt_id: 3, title: "Option Loading...", votes: 0 },
    ],
    totalVotes: 0,
  });
  const [isPollExists, setIsPollExists] = useState(true);

  const websocketCon = () => {
    client = new WebSocket(`${localEndpoint}?poll_id=${pollId}`);
    client.onopen = () => {
      console.log("Websocket connected");
    };

    client.onmessage = (event) => {
      const pollData = JSON.parse(event.data).pollData;
      console.log("got updated poll data");
      console.log(pollData, pollData.pollId, pollData.poll.options);
      setPoll(pollData.poll);
    };

    client.onclose = (e) => {
      console.log("Websocket disconnected.");
      console.log(e.reason);
    };

    client.onerror = (err) => {
      console.error(
        `Socket encountered error : ${err.message}, Closing socket`
      );
      client.close();
    };
  };
  const percentValue = (number, total) => {
    if (total === 0) return 0;
    return Math.round((number / total) * 100);
  };

  useEffect(() => {
    const vote = userVotes.find((vote) => vote.poll_id === parseInt(pollId));
    if (vote) {
      const option = poll?.options.find((opt) => opt.opt_id === vote.opt_id);
      setUserOption(option);
    }
  }, [pollId, poll?.options, userVotes]);

  useEffect(() => {
    // get poll details(question,choices and votes) from db
    (async () => {
      try {
        const resp = await getPollData(pollId);
        setIsPollExists(resp.isPollExists);
        setPoll(resp.poll);
      } catch (e) {
        setIsPollExists(false);
        navigate("/", { replace: true });
      }
    })();
    setLoading(false);
  }, [pollId, navigate]);

  useEffect(() => {
    websocketCon();
  }, []);
  if (loading) {
    return (
      <div className="bg-gray-100 flex-1 flex items-center justify-center">
        <CircularProgress style={{ height: "50px", width: "50px" }} />{" "}
      </div>
    );
  }
  return (
    <div className="bg-gray-100 flex-1">
      <div className="max-w-4xl mx-auto mt-8 px-4 mb-52 md:mb-9">
        <h1 className="text-gray-800 font-bold text-3xl max-w-prose">
          {poll?.question}
        </h1>
        <div className="mt-8 flex flex-col md:flex-row">
          <div className="flex flex-col gap-6 w-full md:w-2/3">
            <LayoutGroup>
              {poll?.options
                .sort((a, b) => b.votes - a.votes)
                .map((opt) => (
                  <OptionProgress
                    key={opt.opt_id}
                    layoutId={opt.opt_id || ""}
                    title={opt.title}
                    votes={opt.votes}
                    percentage={percentValue(opt.votes, poll.totalVotes)}
                  />
                ))}
            </LayoutGroup>
          </div>
          <div className="flex flex-col-reverse w-full fixed bottom-0 left-0 bg-white p-4 mt-9 md:mt-0 md:ml-16 md:w-1/3 md:static md:flex-col md:bg-transparent">
            {userOption ? (
              <div className="px-4 py-2 text-center md:text-left rounded-md bg-blue-200">
                You voted{" "}
                <span className="font-semibold">{userOption.title}</span> on
                this poll
              </div>
            ) : (
              <Link
                to={`/poll/${pollId}`}
                className="px-4 py-2 bg-green-400 rounded text-white font-bold text-center"
              >
                Cast your vote
              </Link>
            )}
            <div className="flex md:flex-col w-full bg-white pb-3 rounded-md md:mt-6 md:last:px-4 md:py-2 shadow-sm">
              <div className="w-full flex flex-col">
                <span className="font-semibold text-gray-400">Total Votes</span>
                <span className="text-2xl font-bold">{poll?.totalVotes}</span>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <QRCodeModalButton url={window.location} />
                <a
                  href={encodeURI(
                    `https://twitter.com/intent/tweet?text=Hey! Please vote on this poll : &url=${window.location}`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  type="button"
                  className="px-4 py-2 flex gap-3 items-center text-white bg-blue-500 rounded-md transition-all hover:bg-blue-400"
                >
                  <TwitterIcon className="h-5 w-5" />
                  <span className="hidden md:inline-block">
                    Share on Twitter
                  </span>
                </a>
                <a
                  href={encodeURI(
                    `https://api.whatsapp.com/send?text=Hey! Please vote on this poll:${window.location}/poll/${pollId}`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  type="button"
                  className="px-4 py-2 flex gap-3 items-center text-white bg-green-500 rounded-md transition-all hover:bg-green-400"
                >
                  <WhatsappIcon className="h-5 w-5" />
                  <span className="hidden md:inline-block">
                    Share on Whatsapp
                  </span>
                </a>
                <a
                  href={encodeURI(
                    `https://telegram.me/share/url?text=&url=${window.location}/poll/${pollId}`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  type="button"
                  className="px-4 py-2 flex gap-3 items-center text-white bg-blue-500 rounded-md transition-all hover:bg-blue-400"
                >
                  <TelegramIcon className="h-5 w-5" />
                  <span className="hidden md:inline-block">
                    Share on Telegram
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PollResults };
