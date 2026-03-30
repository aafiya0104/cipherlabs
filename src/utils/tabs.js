import { useEffect, useRef, useState } from "react";
import { THEMES, TABS } from "./constants";

function useAnimatedTheme(activeTab) {
  const [theme, setTheme] = useState(THEMES[activeTab]);
  const [fading, setFading] = useState(false);
  const prev = useRef(activeTab);

  useEffect(() => {
    if (prev.current === activeTab) return;
    prev.current = activeTab;
    setFading(true);
    const t = setTimeout(() => {
      setTheme(THEMES[activeTab]);
      setFading(false);
    }, 90);
    return () => clearTimeout(t);
  }, [activeTab]);

  return { theme, fading };
}
export default useAnimatedTheme;

