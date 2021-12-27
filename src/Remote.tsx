import { Subscriber } from "@opentok/client";
import { RefObject, useEffect, useRef, useState } from "react";

interface RemoteProps {
  subscriber: Subscriber
}

export const Remote = ({ subscriber }: RemoteProps) => {
  const videoRef = useRef() as RefObject<HTMLVideoElement>;
  const [hasVideo, setHasVideo] = useState(subscriber.stream?.hasVideo);

  useEffect(() => {
      // if (subscriber.element) {
      //   videoRef.current!.srcObject = (subscriber.element as any).srcObject;
      //   return;
      // }

      subscriber.on('videoElementCreated', (event: any) => {
        videoRef.current!.srcObject = event.element.srcObject;
      });

      subscriber.on('videoEnabled', () => setHasVideo(true));
      subscriber.on('videoDisabled', () => setHasVideo(false));

  }, [subscriber]);

  return (<div className="remote">
    <video ref={videoRef} autoPlay muted playsInline></video>
    Stream has video: { String(hasVideo) }
  </div>);
};
