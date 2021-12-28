export interface SessionConfig {
  apiKey: string;
  sid: string;
  token: string;
}

interface SessionProps {
  config: SessionConfig;
  isConnected?: boolean;
  onRemove: () => void;
  onDisconnect: () => void;
  onConnect: () => void;
}

export const Session = ({
  config,
  onConnect,
  onDisconnect,
  onRemove,
  isConnected,
}: SessionProps) => {
  return (
    <div className="session">
      <div className="session-id" title={config.sid}>
        {config.sid.slice(18, 32)}...
      </div>
      <div className="session-actions">
        {isConnected && <button onClick={onDisconnect}>🔴 Disconnect</button>}
        {!isConnected && <button onClick={onConnect}>⚪ Connect</button>}
        <button onClick={onRemove}>❌ Remove</button>
      </div>
    </div>
  );
};
