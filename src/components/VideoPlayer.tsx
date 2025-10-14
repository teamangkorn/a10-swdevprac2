"use client";
import { useRef, useEffect } from "react";
import { useWindowListener } from "@/hooks/useWindowListener";
export function VideoPlayer({
  vdoSrc,
  isPlaying,
}: {
  vdoSrc: string;
  isPlaying: boolean;
}) {
  const vdoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    // alert("width is " + vdoRef.current?.videoWidth);
    if (isPlaying) {
      //   alert("Play VDO");
      vdoRef.current?.play();
    } else {
      //   alert("Pause VDO");
      vdoRef.current?.pause();
    }
  }, [isPlaying]);

  useWindowListener("resize", (e) => {
    alert("Window Width is " + (e.target as Window).innerWidth);
  });
  return (
    <video src={vdoSrc} ref={vdoRef} className="w-[40%]" controls loop muted />
  );
}

export default VideoPlayer;
