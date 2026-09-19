"use client";
import {useEffect} from "react";import {useRouter} from "next/navigation";import {apiJson} from "@/lib/api";
export default function Page(){const r=useRouter();useEffect(()=>{apiJson("/api/auth/sign-out",{method:"POST",body:"{}"}).finally(()=>r.push("/"))},[r]);return <main style={{padding:24}}>Signing out...</main>}
