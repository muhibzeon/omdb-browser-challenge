import styles from "./Loader.module.css";
import { ImSpinner10 } from "react-icons/Im";

const Loader = () => {
  return (
    <div className={styles.loadingIcon}>
      <ImSpinner10 />
    </div>
  );
};

export default Loader;
