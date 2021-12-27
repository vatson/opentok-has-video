import { Publisher, Session as OTSession, Subscriber } from "@opentok/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { AddSessionConfig } from "./AddSessionConfig";
import { Local } from "./Local";
import { Remote } from "./Remote";
import { SessionConfig, Session } from "./Session";
import "./styles.css";

export default function App() {
  const [sessionConfigs, setSessionConfig] = useLocalStorage<SessionConfig[]>(
    "sessions",
    []
  );
  const [currentSession, setCurrentSession] = useState<OTSession>();
  const [publisher, setPublisher] = useState<Publisher>(); 
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  // const [hasVideo, setHasVideo] = useState<boolean>();

  const addConfig = useCallback(
    (newConfig: SessionConfig) => {
      const existing = sessionConfigs?.find(
        (config) => config.sid === newConfig.sid
      );

      if (!existing) {
        setSessionConfig([...(sessionConfigs || []), newConfig]);
      }
    },
    [sessionConfigs, setSessionConfig]
  );

  const disconnect = useCallback(() => {
    if (currentSession) {
      if (publisher) {
        currentSession.unpublish(publisher);
      }
      subscribers.forEach(s => currentSession.unsubscribe(s));

      currentSession.disconnect();

      setCurrentSession(undefined);
      setSubscribers([]);
    }
  }, [currentSession, publisher, subscribers]);

  const connect = useCallback(
    (config: SessionConfig) => {
      if (currentSession && currentSession.sessionId !== config.sid) {
        disconnect();
      }

      const session = OT.initSession(config.apiKey, config.sid);
      setCurrentSession(session);

      // session.on("streamCreated", function ({ stream }) {
      //   const subscriber = session.subscribe(stream, "", {
      //     insertDefaultUI: false
      //   });
  
      //   subscriber.on('destroyed', () => {
      //     session.unsubscribe(subscriber);
      //     setSubscribers(subscribers => subscribers.filter(s => s !== subscriber));
      //   });
  
      //   setSubscribers(subscribers => {
      //     return [...subscribers, subscriber]
      //   });
      // });

      session.connect(config.token, (error) => {
        if (error) return alert(error);

        if (publisher) {
          // setHasVideo(publisher.stream?.hasVideo!);
          console.log(publisher);
          session.publish(publisher, (err) => err && alert(err));
        }
      });
    },
    [currentSession, disconnect, publisher]
  );

  const removeConfig = useCallback(
    (removing: SessionConfig) => {
      if (currentSession && removing.sid === currentSession.sessionId) {
        disconnect();
      }

      setSessionConfig(() => {
        return sessionConfigs?.filter((config) => config.sid !== removing.sid)
      });
    },
    [currentSession, setSessionConfig, disconnect, sessionConfigs]
  );

  const initPublisher = useCallback((publisher: Publisher) => {
    setPublisher(publisher);

    // if (currentSession && currentSession.connection) {
    //   currentSession.publish(publisher, (err) => err && alert(err));
    // }
  }, [])

  useEffect(() => {
    if (!currentSession) return;

    currentSession.on("streamCreated", function ({ stream }) {
      const subscriber = currentSession.subscribe(stream, "", {
        insertDefaultUI: false
      });

      subscriber.on('destroyed', () => {
        setSubscribers(subscribers => subscribers.filter(s => s !== subscriber));
      });

      setSubscribers(subscribers => [...subscribers, subscriber]);
    });

    return () => {
      currentSession.off("streamCreated");
    }
  }, [currentSession]);

  return (
    <div className="App">
      {/* Stream has video: { String(hasVideo) } */}

      <Local onInit={initPublisher} />
      <div className="subscribers">
        {subscribers.map((subscriber, i) => (
          <Remote key={subscriber.id || i} subscriber={subscriber} />
        ))}
      </div>
      <div className="sessions">
        {sessionConfigs?.map((config) => (
          <Session
            key={config.sid}
            config={config}
            isConnected={
              currentSession && currentSession.sessionId === config.sid
            }
            onRemove={() => removeConfig(config)}
            onConnect={() => connect(config)}
            onDisconnect={() => disconnect()}
          />
        ))}
      </div>
      <AddSessionConfig onAdd={addConfig} />
    </div>
  );
}
