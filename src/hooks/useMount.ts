import { useEffect, useState } from "react";
import { useAuth } from "../atom";

export const useMount = () => {
  const [isMounted, setIsMounted] = useState(false);
  const user = useAuth();

  useEffect(() => {
    (async () => {
      setIsMounted(true);
      if (user) {
      }
    })()
  }, []);

  return { isMounted }

}
