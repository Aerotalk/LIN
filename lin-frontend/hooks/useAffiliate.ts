"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useCallback } from "react";

export const useAffiliate = () => {
    const searchParams = useSearchParams();
    const refFromUrl = searchParams.get("ref");

    useEffect(() => {
        if (refFromUrl) {
            sessionStorage.setItem("affiliate_ref", refFromUrl);
        }
    }, [refFromUrl]);

    const getRef = useCallback(() => {
        return refFromUrl || (typeof window !== "undefined" ? sessionStorage.getItem("affiliate_ref") : null);
    }, [refFromUrl]);

    const getLinkWithRef = useCallback((path: string) => {
        const currentRef = getRef();
        if (!currentRef) return path;

        const url = new URL(path, typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
        url.searchParams.set("ref", currentRef);
        return url.pathname + url.search;
    }, [getRef]);

    return {
        affiliateRef: getRef(),
        getLinkWithRef
    };
};
