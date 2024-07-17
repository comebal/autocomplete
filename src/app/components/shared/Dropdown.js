import { useState, useEffect } from "react";
import Input from "./Input";
import Autocomplete from "./Autocomplete";
import styles from './Dropdown.module.css';

export default function Dropdown({ handleUpdateSearch, getResults, hideDropdown }){
   const [suggestions, setSuggestions] = useState([]);
   const [searchText, setSearchText] = useState([]);

   const [selectedSuggestion, setSelectedSuggestion] = useState(0);

   useEffect(() => {
      setSuggestions([]);
   }, [hideDropdown])

   const updateSearch = (search) => {
      setSearchText(search);
      handleUpdateSearch(search);
   }

   const onChange = async (e) => {
      const text = e.target.value;
      if(text && text.length > 1){
         updateSearch(text);

         const searchResults = await fetch('https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json', {
            method: 'GET',
         });
      
         if(searchResults?.ok){
            const results = await searchResults.json();
            setSuggestions(results?.suggestions);
         }else{
            console.log('Error fetching results');
         }
      }else{
         setSuggestions([]);
         updateSearch(text);
      }
   }

   const onSelect = (item) => {
      setSearchText(item);
      setSuggestions([]);
      getResults(item);
   }

   const onKeyChange = (e) => {
      if(e.key === 'ArrowUp'){
         setSelectedSuggestion(selectedSuggestion - 1 < 0 ? suggestions.length - 1 : selectedSuggestion - 1);
      }else if(e.key === 'ArrowDown'){
         setSelectedSuggestion(selectedSuggestion + 1 > suggestions.length - 1 ? 0 : selectedSuggestion + 1);
      }else if (e.key === 'Enter') {
         setSearchText(suggestions[selectedSuggestion]);
         getResults(suggestions[selectedSuggestion]);
         setSuggestions([]);
      }
   }

   const cancelSearch = () => {
      setSearchText('');
      setSuggestions([]);
   }

   return (
      <div className={styles.container}>
         <Input
            value={searchText} 
            onChange={onChange} 
            onKeyChange={onKeyChange} 
            cancelSearch={cancelSearch} 
            closeIcon='/assets/icon-close.png' 
         />
         {suggestions && suggestions.length > 0 && <Autocomplete selectedSuggestion={selectedSuggestion} onSelect={onSelect} searchText={searchText} suggestions={suggestions} />}
      </div>
   )
}