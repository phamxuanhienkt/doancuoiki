"use client";
import { abi, contractAddress } from "@/config";
import { useEffect, useState } from "react";
import { formatEther, parseEther } from "viem";
import {
  useAccount,
  useConnect,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { metaMask } from "wagmi/connectors";
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [coins, setCoins] = useState("0");
  const [notification, setNotification] = useState("");
  const conn = useConnect();
  const { address, isConnected } = useAccount();
  const { data, refetch } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "balanceOf",
    args: [address],
  });
  const { writeContract } = useWriteContract();

  useEffect(() => {
    setCoins(formatEther(BigInt((data ?? "0") as string)));
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (isFull) return;

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = (prevSeconds + 1) % 60;
        if (newSeconds === 0) {
          setIsFull(true);
        }
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isFull]);

  const resetTimer = () => {
    if (!address) {
      conn.connect({ connector: metaMask() });
    }
    if (!isConnected) {
      setNotification("You are not connected wallet!");
      setTimeout(() => {
        setNotification("");
      }, 3000); // Ẩn thông báo sau 3 giây
    }
    if (isFull) {
      writeContract({
        abi: abi,
        address: contractAddress,
        args: [address, parseEther("0.1")],
        functionName: "mint",
      });

      refetch();
      setSeconds(0);
      setIsFull(false);
      setNotification("You earning 0.1 coin!");
      setTimeout(() => {
        setNotification("");
      }, 3000); // Ẩn thông báo sau 3 giây
    } else {
      setNotification("next earnings not yet available");
      setTimeout(() => {
        setNotification("");
      }, 3000); // Ẩn thông báo sau 3 giây
    }
  };

  const strokeDashoffset = 282.6 - (282.6 * seconds) / 60; // // Tính toán giá trị strokeDashoffset

  return (
    <div
      className={`relative flex items-center justify-center w-48 h-48 rounded-full ${
        isFull ? "bg-blue-500 animate-pulse-background" : "bg-gray-100"
      }`}
      onClick={resetTimer}
    >
      <div className="relative flex flex-col items-center justify-center w-48 h-48 cursor-pointer">
        <div className="relative w-48 h-48">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="gray"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                stroke="blue"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="282.6"
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 linear"
              />
            </svg>
          </div>
          {isFull && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <svg className="w-full h-full animate-pulse-circle">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  stroke="blue"
                  strokeWidth="10"
                  fill="transparent"
                />
              </svg>
            </div>
          )}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            {isFull ? (
              <span className="text-2xl font-bold text-yellow-500">
                Get Coin Now
              </span>
            ) : (
              <span className="text-2xl font-bold text-yellow-500">
                Get Coin Now
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 text-lg"></div>
      {notification && (
        <div className="absolute top-4 bg-green-500 text-white p-2 rounded">
          {notification}
        </div>
      )}
    </div>
  );
};

export default Timer;
