import OT, { Publisher } from "@opentok/client";
import { RefObject, useEffect, useRef, useState } from "react";

interface LocalProps {
  hasVideo?: boolean;
  onInit: (publisher: Publisher) => void;
  onVideoChange: () => void;
}

export const Local = ({ onInit, hasVideo, onVideoChange }: LocalProps) => {
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
    pb.on("streamDestroyed", (e) => e.preventDefault());

    onInit(pb);
    setPublisher(pb);

    return () => pb.destroy();
  }, [onInit]);

  useEffect(() => {
    if (publisher) {
      publisher.publishVideo(enabled);
    }
  }, [enabled, publisher]);

  return (
    <div className="local">
      <div className="local-header">
        publisher.stream.hasVideo:{" "}
        {typeof hasVideo === "undefined" ? "offline" : String(hasVideo)}
      </div>
      <video ref={videoRef} autoPlay muted playsInline></video>
      <div className="local-actions">
        <button onClick={() => (setEnabled(!enabled), onVideoChange())}>
          {enabled ? "🔴 video" : "⚪ video"}
        </button>
      </div>
    </div>
  );
};
