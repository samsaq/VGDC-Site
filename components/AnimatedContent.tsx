"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedContentProps {
  children: ReactNode;
  uniqueKey: string | number;
  className?: string;
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  uniqueKey,
  className = "w-full",
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={uniqueKey}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
