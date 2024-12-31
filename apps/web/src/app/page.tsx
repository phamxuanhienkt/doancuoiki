import Head from "next/head";
import VideoPlayer from "./page/api/video";
import VideoList from "./page/api/ListVideo";
import Timer from "./page/api/Timer";
import AdBanner from "./page/api/AdBanner";
import VideoChar from "./page/api/VideoChar";
import AdsterraBanner from "./page/api/add";
import SkyBackground from "./page/api/SkyBackground";



export default function Home() {
  return (
    <>
     <SkyBackground />
      <div className="flex flex-row justify-between p-24  ">
        <div className="flex w-[20%] flex-row">
          <div className="flex flex-col p-4 gap-3">
            <div>
              <VideoList /> 
            </div>
            <div>
              <VideoChar />
            </div>
          </div>
          <div>
            <AdBanner />
          </div>
        </div>
        <div className="flex w-1/2 ">
          <VideoPlayer />
        </div>
        <div className="flex flex-col w-1/4">
          <Timer />
          <AdsterraBanner />
        </div>
      </div>
    </>
  );
}
