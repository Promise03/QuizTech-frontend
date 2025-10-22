// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// const ScrollZoomWrapper = ({ children }) => {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"], // start scaling as it enters
//   });

//   // Create scale + opacity transformations
//   const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);
//   const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

//   return (
//     <motion.div
//       ref={ref}
//       style={{ scale, opacity }}
//       transition={{ type: "spring", stiffness: 100 }}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export default ScrollZoomWrapper;
