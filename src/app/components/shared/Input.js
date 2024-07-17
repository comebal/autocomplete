import { useRef } from 'react';
import Image from 'next/image';
import styles from './Input.module.css';

export default function Input(props){
   const {
      type = 'text',
      onChange,
      value,
      onKeyChange,
      closeIcon,
      cancelSearch,
   } = props;

   const inputRef = useRef();

   const closeSearch = () => {
      cancelSearch();
      inputRef.current.focus();
   }

   let iconElem;
   if (closeIcon && value.length > 0) {
      iconElem = <Image onClick={() => closeSearch()} width={12} height={12} src={closeIcon} alt='Close Icon' className={styles.icon} />
   }

   const handleChange = (e) => {
      typeof onChange === 'function' && onChange(e);
   };

   return (
      <div className={styles.container}>
         <input
            className={styles.input} 
            type={type}
            onChange={handleChange}
            value={value}
            onKeyDown={onKeyChange}
            ref={inputRef}
         />
         {iconElem}
      </div>
   );
}