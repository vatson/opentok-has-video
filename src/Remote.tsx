import { Subscriber } from "@opentok/client";
import { RefObject, useEffect, useRef, useState } from "react";

interface RemoteProps {
  subscriber: Subscriber;
}

export const Remote = ({ subscriber }: RemoteProps) => {
  const videoRef = useRef() as RefObject<HTMLVideoElement>;
  const [hasVideo, setHasVideo] = useState(subscriber.stream?.hasVideo);

  useEffect(() => {
    subscriber.on("videoElementCreated", (event: any) => {
      videoRef.current!.srcObject = event.element.srcObject;
    });

    subscriber.on("videoEnabled", () => setHasVideo(true));
    subscriber.on("videoDisabled", () => setHasVideo(false));
  }, [subscriber]);

  return (
    <div className="remote">
      <div className="local-header">
        subscriber.stream.hasVideo: {String(hasVideo)}
      </div>
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
};
