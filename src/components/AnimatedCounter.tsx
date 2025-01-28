"use client";

import React from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  to: number;
  duration?: number;
  formatter?: (value: number) => string;
}

export default function AnimatedCounter({
  to,
  duration = 3,
  formatter = (value) => value?.toFixed(0),
}: AnimatedCounterProps) {
  const springValue = useSpring(0, { duration: duration * 1000 });
  const displayValue = useTransform(springValue, (latest) => formatter(latest));

  React.useEffect(() => {
    springValue.set(to);
  }, [to, springValue]);

  return <motion.span>{displayValue}</motion.span>;
}
