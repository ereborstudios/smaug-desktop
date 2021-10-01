import React, { useState, useEffect } from 'react'
import { getVersion } from '@tauri-apps/api/app'

export default function WelcomeMessage() {
  const [version, setVersion] = useState(null);

  const getVersionAsync = async () => {
    const v = await getVersion();
    setVersion(v);
  }

  useEffect(() => {
    if (!version) getVersionAsync();
  }, [version]);

  return (
    <div className="bg-gray-900 rounded shadow shadow-lg border">
      <div className="max-w-2xl mx-auto text-center pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-extrabold text-indigo-200 sm:text-2xl">
          <span className="block">
            Welcome to Smaug Desktop!
          </span>
        </h2>
        <h3 className="text-xs font-bold text-white">
          v{version}
        </h3>
        <p className="mt-4 text-lg leading-6 text-indigo-400">
          Smaug is the easiest way to manage your projects when you're working with the DragonRuby Game Toolkit.
        </p>
      </div>
    </div>
  )
}
