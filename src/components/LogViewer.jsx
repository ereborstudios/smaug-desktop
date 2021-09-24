import React, { useEffect, useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { LazyLog, ScrollFollow } from 'react-lazylog';
import './LogViewer.css';

export const LogViewer = ({ ...props }) => {
  const gameLog = useStoreState((state) => state.gameLog);
  //const setGameLog = useStoreActions((actions) => actions.setGameLog);
  const [text, setText] = useState('');

  useEffect(() => {
    // Filter out file reload noise
    if (gameLog && gameLog.match(/\*\* INFO: .*/)) return;
    if (gameLog && gameLog.match(/\* INFO: .*/)) return;
    if (gameLog && gameLog === '') return;

    setText(text + "\n" + (gameLog || ''));
  }, [gameLog, text]);

  return (
    <ScrollFollow
      startFollowing
      render={({ onScroll, follow, startFollowing, stopFollowing }) => (
        <LazyLog
          style={{ fontSize: '0.65rem', background: '#282a36' }}
          selectableLines text={text.replace(/[\r\n]+/g, '\n').slice(1) || '\n'}
          onScroll={onScroll}
          follow={follow} />
      )}
    />
  );
};

export default LogViewer;
