import React, { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { emit, listen, once } from '@tauri-apps/api/event'

export const LogRecorder = ({ ...props }) => {
  const pushGameLog = useStoreActions((actions) => actions.pushGameLog);
  useEffect(() => {
    if (window.logRecorder) {
      // noop
    } else {
      window.logRecorder = listen('cmd.stdout.data', event => {
        pushGameLog(event.payload);
      });
    }
  });

  return (<React.Fragment />);
};

export default LogRecorder;
