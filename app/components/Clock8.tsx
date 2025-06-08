"use client";

import { Variants } from "framer-motion";
import { motion, useAnimation } from "framer-motion";

interface Clock8Props extends React.SVGAttributes<SVGSVGElement> {
  width?: number;
  height?: number;
  strokeWidth?: number;
  stroke?: string;
  className?: string;
}

const clockHandVariants: Variants = {
  normal: {
    rotate: 0,
    originX: "50%",
    originY: "50%",
  },
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
    },
  },
};

const bellVariants: Variants = {
  normal: { rotate: 0 },
  animate: {
    rotate: [-10, 10, -10],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const Clock8 = ({
  width = 24,
  height = 24,
  strokeWidth = 2,
  stroke = "#0086c9",
  className = "",
  ...props
}: Clock8Props) => {
  const controls = useAnimation();

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        cursor: "pointer",
        userSelect: "none",
      }}
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="12" r="10" />
        <motion.polyline
          points="12 6 12 12 8 14"
          variants={clockHandVariants}
          animate={controls}
          initial="normal"
        />
      </svg>
    </div>
  );
};

export { Clock8 }; 