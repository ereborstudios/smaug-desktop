import React from 'react'
import { useHistory } from "react-router-dom";
import { appWindow } from '@tauri-apps/api/window';

export default function WindowEventHandler() {
  const { push } = useHistory();

  appWindow.listen('tauri://menu', ({ event, payload }) => {
    if (payload === 'newProject') {
      push('/projects/new');
    }
    if (payload === 'manageVersions') {
      push('/system');
    }
  })

  return (
    <React.Fragment />
  );
}
