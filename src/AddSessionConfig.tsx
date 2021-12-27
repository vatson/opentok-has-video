import { useCallback, useState } from "react";
import { SessionConfig } from "./Session";

interface AddSessionProps {
  onAdd: (sessionConfig: SessionConfig) => void;
}

export const AddSessionConfig = ({ onAdd }: AddSessionProps) => {
  const [apiKey, setApiKey] = useState("47363711");
  const [sid, setSid] = useState(
    "2_MX40NzM2MzcxMX5-MTY0MDI5NTIzNjM1NH5MWmduYUhQNHR0YXNpYWRVdHlWdkF5b2J-UH4"
  );
  const [token, setToken] = useState(
    "T1==cGFydG5lcl9pZD00NzM2MzcxMSZzaWc9MDU3MzRlMjgyMWUyYzY2NzdjZjNiMDk5NDUwYTdkZDgzOWU5ZjlmYjpzZXNzaW9uX2lkPTJfTVg0ME56TTJNemN4TVg1LU1UWTBNREk1TlRJek5qTTFOSDVNV21kdVlVaFFOSFIwWVhOcFlXUlZkSGxXZGtGNWIySi1VSDQmY3JlYXRlX3RpbWU9MTY0MDI5NTIzNiZub25jZT0wLjE0MjA4OTM2ODM0NDUwMTI1JnJvbGU9bW9kZXJhdG9yJmV4cGlyZV90aW1lPTE2NDAzODE2MzYmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD0="
  );

  const handleAdd = useCallback(() => {
    onAdd({ apiKey, sid, token });
  }, [apiKey, sid, token, onAdd]);

  return (
    <fieldset>
      <legend>New Session</legend>
      <input
        placeholder="API Key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <input
        placeholder="Session ID"
        value={sid}
        onChange={(e) => setSid(e.target.value)}
      />
      <input
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </fieldset>
  );
};
