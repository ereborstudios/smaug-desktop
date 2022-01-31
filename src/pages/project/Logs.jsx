import React from 'react'
import LogViewer from '../../components/LogViewer';

export default function ProjectLogs({ match, ...props }) {
  return (
    <div className="flex h-screen overflow-hidden space-x-4">
      <div className="flex-grow h-full">
        <div className="flex-grow h-full text-left logViewer">
          <LogViewer />
        </div>
      </div>
    </div>
  );
}
