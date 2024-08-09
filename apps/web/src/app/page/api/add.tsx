"use client";
import React from 'react';

const AdsterraBanner = () => {
  return (
    <div className="my-4">
      <div
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.highrevenuenetwork.com/cgm0xaddzp?key=3a84ada4a4b97b0dbe2e03fd1ef9fbed"
                        width="500"
                        height="500"
                        frameborder="0"
                        scrolling="no"
                        style="border: none; overflow: hidden;"
                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                  </iframe>`
        }}
      />
    </div>
  );
};

export default AdsterraBanner;
