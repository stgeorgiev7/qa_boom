import { motion } from "framer-motion";
import styles from "./Backdrop.module.scss";
import { ReactNode, RefObject } from "react";

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
   exit={{ opacity: 0, transition: { delay: 0.2 } }}
  >
   {children}
  </motion.div>
 );
}
