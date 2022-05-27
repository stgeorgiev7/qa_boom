import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import styles from "./Modal.module.scss";

interface IBackdrop {
 handleClose: () => void;
 text: string;
}
const dropIn = {
 hidden: {
  y: "-100vh",
  scale: 0,
 },
 visible: {
  y: "0",
  scale: 1,
  transition: {
   duration: 0.1,
   type: "spring",
   damping: 25,
   stiffness: 500,
  },
 },
 exit: {
  scale: 0,
  y: "100vh",
  opacity: 0,
 },
};

export default function Modal({ handleClose, text }: IBackdrop) {
 return (
  <Backdrop onClick={handleClose}>
   <motion.div
    onClick={(e) => e.stopPropagation()}
    className={styles.modal}
    variants={dropIn}
    initial="hidden"
    animate="visible"
    exit="exit"
   >
    {text}
   </motion.div>
  </Backdrop>
 );
}
