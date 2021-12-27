import OT, { Publisher } from "@opentok/client";
import { RefObject, useEffect, useRef, useState } from "react";

interface LocalProps {
  onInit: (publisher: Publisher) => void
}

export const Local = ({ onInit }: LocalProps) => {
  const videoRef = useRef() as RefObject<HTMLVideoElement>;
  const [publisher, setPublisher] = useState<Publisher>();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const pb = OT.initPublisher("", { insertDefaultUI: false });
    pb.on("videoElementCreated", function (event: any) {
      if (videoRef.current) {
        videoRef.current.srcObject = event.element.srcObject;
      }
    });
    // setHasVideo(pb.stream?.hasVideo);
    pb.on('streamDestroyed', (e) => e.preventDefault());

    onInit(pb);
    setPublisher(pb);

    return () => pb.destroy();
  }, [onInit]);

  useEffect(() => {
    if (publisher) {
      publisher.publishVideo(enabled);
    }
  }, [publisher, enabled])

  return (
    <div className="local">
      <video ref={videoRef} autoPlay muted playsInline></video>
      <button onClick={() => setEnabled(!enabled)}>Toggle video</button>
    </div>
  );
};
