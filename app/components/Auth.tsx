"use client";

import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Auth() {
    const [user, setUser] = useState<any>(null);

    useEffect(()=>{
        //get initial session
        supabase.auth.getUser().then(({data})=>{
            setUser(data.user);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => {subscription.unsubscribe();
        }
    }, []);

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
        });
    }

    const signOut = async () => {
        await supabase.auth.signOut();
    }

    return { user, signInWithGoogle, signOut };
}