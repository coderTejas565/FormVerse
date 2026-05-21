import { api } from "~/trpc/server";

export default async function Home() {

  const { message }= await api.chaicode.query({email: 't@r.com'})
  
  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h2>Server Status: {message}</h2>
      </div>
    </main>
  );
}
