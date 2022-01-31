import React from 'react';
import { useStoreState } from 'easy-peasy';
import { LazyLog, ScrollFollow } from 'react-lazylog';
import './LogViewer.css';

export const LogViewer = ({ ...props }) => {
  const gameLog = useStoreState((state) => state.getGameLog);

  return (
    <ScrollFollow
      startFollowing
      render={({ onScroll, follow, startFollowing, stopFollowing }) => (
        <LazyLog
          style={{ fontSize: '0.65rem', background: '#282a36' }}
          selectableLines
          text={gameLog || "\n"}
          onScroll={onScroll}
          follow={follow} />
      )}
    />
  );
};

export default LogViewer;
