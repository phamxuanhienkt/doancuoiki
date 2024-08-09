import Head from 'next/head';
import VideoPlayer from './page/api/video';
import VideoList from './page/api/ListVideo';
import Timer from './page/api/Timer';
import AdBanner from './page/api/AdBanner';
import VideoChar from './page/api/VideoChar';
import AdsterraBanner from './page/api/add';


export default function Home() {
  return (
    <>
      <Head>
        <title>My Website</title>
        <meta name="description" content="Example implementation of Adsterra banner with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-row justify-between p-24 ">
        <div className="flex w-[20%] flex-row">
          <div className="flex flex-col p-4">
            <div><VideoList/></div>
            <div><VideoChar/></div> 
          </div>   
          <div><AdBanner/></div>
        </div>
        <div className="flex border-2 w-1/2 "><VideoPlayer /></div>
        <div className="flex flex-col w-1/4">
          <Timer /> 
          <AdsterraBanner/>
        </div>
      </main>
    </>
  );
}
