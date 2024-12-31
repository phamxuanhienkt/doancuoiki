// "use client";
// import { abi, contractAddress } from "@/config";
// import { useEffect, useState } from "react";
// import { formatEther, parseEther } from "viem";
// import {
//   useAccount,
//   useConnect,
//   useReadContract,
//   useWriteContract,
// } from "wagmi";
// import { metaMask } from "wagmi/connectors";
// const GetGift = () => {
//   const [seconds, setSeconds] = useState(0);
//   const [isFull, setIsFull] = useState(false);
//   const [coins, setCoins] = useState("0");
//   const [notification, setNotification] = useState("");
//   const conn = useConnect();
//   const { address, isConnected } = useAccount();
//   const { data, refetch } = useReadContract({
//     abi,
//     address: contractAddress,
//     functionName: "balanceOf",
//     args: [address],
//   });
//   const { writeContract } = useWriteContract();

//   useEffect(() => {
//     setCoins(formatEther(BigInt((data ?? "0") as string)));
//     console.log(data);
//   }, [data]);

//   useEffect(() => {
//     if (isFull) return;

//     const interval = setInterval(() => {
//       setSeconds((prevSeconds) => {
//         const newSeconds = (prevSeconds + 1) % 60;
//         if (newSeconds === 0) {
//           setIsFull(true);
//         }
//         return newSeconds;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isFull]);

//   const resetTimer = () => {
//     if (!address) {
//       conn.connect({ connector: metaMask() });
//     }
//     if (!isConnected) {
//       setNotification("You are not connected wallet!");
//       setTimeout(() => {
//         setNotification("");
//       }, 3000); // Ẩn thông báo sau 3 giây
//     }
//     if (isFull) {
//       writeContract({
//         abi: abi,
//         address: contractAddress,
//         args: [address, parseEther("0.1")],
//         functionName: "mint",
//       });

//       refetch();
//       setSeconds(0);
//       setIsFull(false);
//       setNotification("You earning 0.1 coin!");
//       setTimeout(() => {
//         setNotification("");
//       }, 3000); // Ẩn thông báo sau 3 giây
//     } else {
//       setNotification("next earnings not yet available");
//       setTimeout(() => {
//         setNotification("");
//       }, 3000); // Ẩn thông báo sau 3 giây
//     }
//   };

//   const strokeDashoffset = 282.6 - (282.6 * seconds) / 60; // // Tính toán giá trị strokeDashoffset

//   return (

      
//   );
// };

// export default GetGift;
