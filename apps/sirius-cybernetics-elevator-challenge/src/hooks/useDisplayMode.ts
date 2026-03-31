import { useEffect, useState } from "react";

export type DisplayMode = "iframe" | "standalone";

/**
 * Detects if the app is running in an iframe (itch.io) or standalone (pollinations.ai)
 * Returns the appropriate display mode for responsive layout
 */
export function useDisplayMode(): DisplayMode {
    const [mode, setMode] = useState<DisplayMode>("standalone");

    useEffect(() => {
        // Detect iframe by checking if window.self !== window.top
        const isIframe = window.self !== window.top;
        const detectedMode: DisplayMode = isIframe ? "iframe" : "standalone";
        
        setMode(detectedMode);
        
        // Apply class to body for CSS targeting
        document.body.classList.remove("iframe-mode", "standalone-mode");
        document.body.classList.add(`${detectedMode}-mode`);
        
        // biome-ignore lint/suspicious/noConsoleLog: helpful for debugging display issues
        console.log(`[SiriusElevator] Display mode: ${detectedMode}`);
    }, []);

    return mode;
}
