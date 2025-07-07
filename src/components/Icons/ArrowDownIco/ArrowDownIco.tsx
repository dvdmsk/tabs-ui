import styles from "./ArrowDownIco.module.scss";
import classNames from "classnames";

type Props = {
  className?: string;
}

const ArrowDownIco:React.FC<Props> = ({className = ''}) => {
  return (
    <div className={classNames(styles.ArrowDownIco, className)} >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M8.5 11.55L4 7.05L5.05 6L8.5 9.45L11.95 6L13 7.05L8.5 11.55Z"
          fill="#343434"
        />
      </svg>
    </div>
  );
};

export default ArrowDownIco;
