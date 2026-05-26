"use client";

import { useState } from "react";
import { trpc } from "~/trpc/client";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = trpc.auth.createUserWithEmailAndPassword.useMutation({
    onSuccess(data) {
      console.log("User created:", data);

      window.location.href = "/dashboard";
    },

    onError(error) {
      alert(error.message);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    signup.mutate({
      fullName,
      email,
      password,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-10">
      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={signup.isPending}>
        {signup.isPending ? "Creating..." : "Signup"}
      </button>
    </form>
  );
}
