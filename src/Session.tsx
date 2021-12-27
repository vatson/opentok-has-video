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
  isConnected
}: SessionProps) => {
  return (
    <div className="session">
      <div className="session-id" title={config.sid}>
        {config.sid.slice(18, 32)}...
      </div>
      <div className="session-actions">
        {isConnected && (
          <span
            className="session-action"
            title="diconnected"
            role="img"
            aria-label="on-air"
            onClick={onDisconnect}
          >
            🔴
          </span>
        )}
        {!isConnected && (
          <span
            className="session-action"
            title="connect"
            role="img"
            aria-label="connect"
            onClick={onConnect}
          >
            🔌
          </span>
        )}
        <span
          className="session-action"
          title="remove"
          role="img"
          aria-label="remove"
          onClick={onRemove}
        >
          ❌
        </span>
      </div>
    </div>
  );
};
