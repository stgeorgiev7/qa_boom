import { motion } from "framer-motion";
import styles from "./Backdrop.module.scss";
import { ReactNode } from "react";

interface IBackdrop {
 children: ReactNode;
 onClick: () => void;
}

export default function Backdrop({ children, onClick }: IBackdrop) {
 return (
  <motion.div
   className={styles.backdrop}
   onClick={onClick}
   initial={{ opacity: 0 }}
   animate={{ opacity: 1 }}
   exit={{ opacity: 0 }}
  >
   {children}
  </motion.div>
 );
}