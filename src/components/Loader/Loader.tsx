import styles from "./Loader.module.css";
import { ImSpinner10 } from "react-icons/im";

const Loader = () => {
  return (
    <div className={styles.loadingIcon}>
      <ImSpinner10 />
    </div>
  );
};

export default Loader;
