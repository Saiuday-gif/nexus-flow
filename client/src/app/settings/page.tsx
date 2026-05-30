"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      <section className="mb-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-medium mb-4">Preferences</h2>

        <div className="space-y-4">
          <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <span className="text-slate-800">Dark mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(event) => setDarkMode(event.target.checked)}
              className="h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <span className="text-slate-800">Notifications</span>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(event) => setNotificationsEnabled(event.target.checked)}
              className="h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <span className="text-slate-800">Auto save</span>
            <input
              type="checkbox"
              checked={autoSave}
              onChange={(event) => setAutoSave(event.target.checked)}
              className="h-5 w-5"
            />
          </label>
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-medium mb-4">Summary</h2>
        <p className="text-sm text-slate-600">
          Your current settings are:
        </p>
        <ul className="mt-4 space-y-2 text-slate-700">
          <li>Dark mode: {darkMode ? "Enabled" : "Disabled"}</li>
          <li>Notifications: {notificationsEnabled ? "Enabled" : "Disabled"}</li>
          <li>Auto save: {autoSave ? "Enabled" : "Disabled"}</li>
        </ul>
      </section>
    </main>
  );
}
