"use client";

import { useState } from "react";
import { trpc } from "~/trpc/client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = trpc.auth.signInUserWithEmailAndPassword.useMutation({
    onSuccess() {
      router.push("/dashboard");
    },
    onError(err) {
      alert(err.message);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    login.mutate({
      email,
      password,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-3">
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={login.isPending}>{login.isPending ? "Logging in..." : "Login"}</button>
    </form>
  );
}
