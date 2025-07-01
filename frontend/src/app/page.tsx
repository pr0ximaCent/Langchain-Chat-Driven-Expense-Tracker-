"use client";

import React, { useState } from "react";

export default function Home() {
  const [entry, setEntry] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/", { method: "GET" });
    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <textarea
          className="border rounded p-2"
          value={entry}
          onChange={e => setEntry(e.target.value)}
          placeholder="Type your expense: e.g. Spent 1000 on groceries"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Test Backend Connection
        </button>
      </form>
      {response && <p className="mt-4 text-green-600">{response}</p>}
    </div>
  );
}
