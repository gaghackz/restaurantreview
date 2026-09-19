"use client";
import {FormEvent,useState} from "react";import {apiJson} from "@/lib/api";
export default function Page(){const [email,setEmail]=useState("");const [msg,setMsg]=useState("");const [err,setErr]=useState("");
 async function submit(e:FormEvent){e.preventDefault();setMsg("");setErr("");try{await apiJson("/api/auth/request-password-reset",{method:"POST",body:JSON.stringify({email,redirectTo:"http://localhost:3000/reset-password"})});setMsg("If that email exists, a reset link has been sent.");}catch(e){setErr(e instanceof Error?e.message:"Request failed");}}
 return <main style={{padding:24,maxWidth:450}}><h1>Forgot password</h1><form onSubmit={submit} style={{display:"grid",gap:12}}><input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required/><button>Send reset link</button></form>{msg&&<p>{msg}</p>}{err&&<p style={{color:"crimson"}}>{err}</p>}</main>}
