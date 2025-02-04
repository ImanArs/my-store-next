"use client";

import { useRouter } from "next/navigation";

const usePageTransition = () => {
  const router = useRouter();

  const transitionTo = (path: string) => {
    if (!document.startViewTransition) {
      router.push(path);
      return;
    }

    document.startViewTransition(() => router.push(path));
  };

  return transitionTo;
};

export default usePageTransition;
