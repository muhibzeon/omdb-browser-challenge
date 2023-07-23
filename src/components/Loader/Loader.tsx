import styles from "./Loader.module.css";
import { ImSpinner10 } from "react-icons/im";

const Loader = () => {
  return (
    <div>
      <p className={styles.text}>Loading...</p>
      <div className={styles.loadingIcon}>
        <ImSpinner10 />
      </div>
    </div>
  );
};

export default Loader;
