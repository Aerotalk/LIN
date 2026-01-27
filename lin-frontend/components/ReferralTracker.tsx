"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ReferralTracker() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const pid = searchParams.get("pid");
        const ts = searchParams.get("ts");
        const sig = searchParams.get("sig");

        if (pid && ts && sig) {
            // Store attribution data
            const attributionData = {
                partnerId: pid,
                timestamp: ts,
                signature: sig,
                capturedAt: Date.now()
            };

            localStorage.setItem("lin_attribution", JSON.stringify(attributionData));
            console.log("✅ Referral attributed to Partner ID:", pid);
        }
    }, [searchParams]);

    return null;
}
