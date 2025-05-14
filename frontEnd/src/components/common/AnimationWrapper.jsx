import React from "react";
import { motion } from "framer-motion";

export default function AnimationWrapper({
  initial = { opacity: 0 },
  className = "",
  animate = { opacity: 1 },
  keyValue = {},
  transition = { duration: 1 },
  children,
}) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={transition}
      className={className}
      key={keyValue}
    >
      {children}
    </motion.div>
  );
}
