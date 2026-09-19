"use client";
import {useEffect,useState} from "react";import {apiJson} from "@/lib/api";
export default function Page(){const [d,setD]=useState<any>();const [e,setE]=useState("");useEffect(()=>{apiJson("/api/auth/get-session").then(setD).catch(x=>setE(x.message))},[]);return <main style={{padding:24}}><h1>Current session</h1>{e?<p>{e}</p>:<pre>{d?JSON.stringify(d,null,2):"Loading..."}</pre>}</main>}
