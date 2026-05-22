'use client'

import { useRouter } from "next/navigation";

import { trpc } from "~/trpc/client";

import { useEffect } from "react";


export default function DashboardPage(){

 const router = useRouter();


 const me = trpc.auth.me.useQuery();
 useEffect(()=>{
    if(me.error){
        router.push("/sign-in")
    }
},[me.error,router])

if(me.isLoading){

 return(
 <p>
   Loading...
  </p>
 )

 }
 
 return(
 <div>
    <h1>Dashboard</h1>
    <p>Logged in as:{me.data?.id}</p>
    </div>
    )
}