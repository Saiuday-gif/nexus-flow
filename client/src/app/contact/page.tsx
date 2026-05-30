"use client";

import React, { useState } from 'react';

export default function ContactPage() {
  // State variables to manage form inputs and submission status
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form submission handler to send contact data to the server
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage('Sending Message...');

    try {
      // 🚀 Please use this for local windows server
      const response = await fetch('http://127.0.0.1:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          subject: "Contact Form Submission",
          message: message
        }),
      });

      const data = await response.json();

      // Server ressponse depends on success or failure of the contact form submission
      if (response.ok && data.success) {
        setIsSuccess(true);
        setStatusMessage('Thank You for contacting us! (Message sent successfully)');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setIsSuccess(false);
        setStatusMessage(data.message || 'Server error try again.');
      }
    } catch {
      setIsSuccess(false);
      setStatusMessage('To see server errors, check the console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 flex flex-col items-center justify-center bg-slate-950 text-white">
      <div className="max-w-md w-full bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center text-blue-500">Contact Form</h1>
        <p className="text-slate-400 text-sm mb-6 text-center">Please fill out the form below and submit</p>

        {/* Server connection status */}
        {statusMessage && (
          <div className={`p-3 rounded-lg text-sm font-semibold mb-6 text-center ${
            isSuccess ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1">Enter Name</label>
            <input 
              type="text" 
              required
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-800 text-white rounded-lg p-2.5 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1">Enter Email</label>
            <input 
              type="email" 
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 text-white rounded-lg p-2.5 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-1">Enter Message</label>
            <textarea 
              rows={4}
              required
              disabled={isLoading}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-800 text-white rounded-lg p-2.5 border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-medium py-2.5 rounded-lg transition-colors cursor-pointer text-center"
          >
            {isLoading ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}