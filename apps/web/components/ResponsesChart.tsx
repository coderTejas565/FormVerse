'use client'

import { LineChart, Line, XAxis, YAxis } from "recharts"


export default function({ data }:any){
    return(
    <LineChart width={500} height={300} data={data} >
        <XAxis dataKey="date"/>
        <YAxis/>
        <Line dataKey="count"/>
        </LineChart>
        )
    }