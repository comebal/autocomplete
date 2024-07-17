import styles from './Autocomplete.module.css';
import cx from 'classnames';

export default function Autocomplete({ searchText, suggestions, onSelect, selectedSuggestion }){

   const renderSuggestion = (suggestion) => {
      return suggestion.replaceAll(searchText, `<span>${searchText}</span>`);
   }

   return (
      <div className={styles.container}>
         {suggestions && suggestions.map((suggestion, index) => (
            <div
               key={index} 
               className={cx(styles.suggestion, {
                  [styles.highlight]: selectedSuggestion === index
               })}
               dangerouslySetInnerHTML={{ __html: renderSuggestion(suggestion) }}
               onClick={() => onSelect(suggestion)}
            >
            </div>
         ))}
      </div>
   )
}