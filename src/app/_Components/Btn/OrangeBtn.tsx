import React from "react";
import * as motion from "motion/react-client";

export default function OrangeBtn(
  { name, myStyles= " " }: { name: string, myStyles?: string },
) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={` ${myStyles} cursor-pointer shadow px-6 py-2 rounded-3xl text-lg capitalize bg-gradient-to-b from-amber-500 to-amber-700 text-white `}
    >

      {name}
    </motion.button>
  );
}
