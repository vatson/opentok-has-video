import { useCallback, useState } from "react";
import { SessionConfig } from "./Session";

interface AddSessionProps {
  onAdd: (sessionConfig: SessionConfig) => void;
}

export const AddSessionConfig = ({ onAdd }: AddSessionProps) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [sid, setSid] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const handleAdd = useCallback(() => {
    onAdd({ apiKey, sid, token });
  }, [apiKey, sid, token, onAdd]);

  return (
    <fieldset className="new-session">
      <legend>New Session</legend>
      <div className="new-session-field">
        <input
          placeholder="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </div>
      <div className="new-session-field">
        <input
          placeholder="Session ID"
          value={sid}
          onChange={(e) => setSid(e.target.value)}
        />
      </div>
      <div className="new-session-field">
        <input
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <button onClick={handleAdd}>Add</button>
    </fieldset>
  );
};
