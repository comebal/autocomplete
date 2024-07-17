import Image from "next/image";
import styles from './Button.module.css';

export default function Button(props){
   const {
      type,
      children,
      icon,
      onClick
    } = props;

    let iconElem;
    if (icon) {
      iconElem = <Image width={17} height={17} src={icon} alt='Button Icon' className={styles.icon} />
    }

    return (
      <button onClick={() => onClick()} type={type} className={styles.button}>
        <span> {iconElem} </span>
        <span> {children} </span>
      </button>
    );
}