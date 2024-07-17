'use client'

import { useState } from 'react';
import Button from '../shared/Button';
import Dropdown from '../shared/Dropdown';
import SearchResults from '../shared/SeachResults';
import styles from './Homepage.module.css';

export default function Homepage(){
   const [searchText, setSearchText] = useState('');
   const [searchResults, setSearchResults] = useState([]);
   const [loading, setIsLoading] = useState(false);
   const [searchError, setSearchError] = useState('');


   const handleUpdateSearch = (query) => {
      setSearchText(query);
   }

   const getResults = async (query) => {
      window.scrollTo(0, 0);
      setIsLoading(true);

      const search = query || searchText;
      handleUpdateSearch(search);
      
      const results = await fetch(`https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json?search=${search.trim()}`, {
         method: 'GET',
         cache: 'no-store',
         next: { revalidate: 1 }
      });
   
      if(results?.ok){
         const data = await results.json();
         setSearchResults(data);
      }else{
         setSearchError('Error fetching results');
         setSearchResults({})
      };

      setIsLoading(false);
   }

   const generatePageResult = () => {
      return `${(searchResults?.Page - 1) * searchResults?.PageSize + 1} - ${searchResults?.Page * searchResults?.PageSize}`;
   }

   return (
      <div className={styles.homepage}>
         <div className={styles.search}>
            <div className={styles.container}>
               <div className={styles.inputContainer}>
                  <Dropdown
                     handleUpdateSearch={handleUpdateSearch} 
                     getResults={getResults}
                     hideDropdown={loading}
                  />

                  <Button onClick={getResults} icon='/assets/icon-search.png'>Search</Button>
               </div>
            </div>
         </div>

         <div className={styles.result}>
            <div className={styles.container}>

               {searchError && (
                  <div className={styles.error}>{searchError}</div>
               )}
               
               {loading && (
                  <div className={styles.loading}>Loading results...</div>
               )}

               {!loading && searchResults && Object.keys(searchResults).length > 0 && (
                  <>
                     <h2 className={styles.heading}>
                        Showing {generatePageResult()} of {searchResults?.TotalNumberOfResults} results
                     </h2>
                     <SearchResults searchText={searchText} results={searchResults?.ResultItems} />
                  </>
               )}
            </div>
         </div>
      </div>
   )
}