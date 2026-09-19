"use client";
import {useEffect,useState} from "react";import {apiJson} from "@/lib/api";
export default function Page(){const [x,setX]=useState<any[]>([]);const [e,setE]=useState("");useEffect(()=>{apiJson("/api/v1/leaderboard").then(setX).catch(a=>setE(a.message))},[]);return <main style={{padding:24}}><h1>Leaderboard</h1>{e&&<p>{e}</p>}<ol>{x.map((a,i)=><li key={a.restaurantId||a.id||i}>{a.name||`Restaurant #${a.restaurantId}`} — {a.score}</li>)}</ol></main>}
