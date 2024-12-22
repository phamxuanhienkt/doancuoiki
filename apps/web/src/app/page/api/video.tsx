'use client';
import { useEffect } from 'react';

const VideoPlayer: React.FC = () => {
  useEffect(() => {
    const adScript = `
      <script type="text/javascript">
        atOptions = {
          'key' : '22753cfe6b485c4382eb448993e52975',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      </script>
      <script type="text/javascript" src="//www.topcreativeformat.com/22753cfe6b485c4382eb448993e52975/invoke.js"></script>
    `;

    const adContainer = document.getElementById('ad-container');
    if (adContainer) {
      adContainer.innerHTML = adScript;
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex justify-center items-center bg-gray-200">
        <div id="ad-container" className="w-full max-w-lg h-24">
          {/* Mã quảng cáo sẽ được nhúng vào đây */}
        </div>
      </div>
      <div className="flex-1 bg-gray-100 p-4">
        <p className="text-gray-700 text-lg">Quảng cáo video:</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
