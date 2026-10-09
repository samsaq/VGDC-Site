"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

export function AnimatedContent({
  children,
  uniqueKey,
  className = "w-full",
}: {
  children: ReactNode;
  uniqueKey: string | number;
  className?: string;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={uniqueKey}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
