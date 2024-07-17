import styles from './SearchResults.module.css';
import Link from 'next/link';

export default function SearchResults({ searchText, results }){
   
   const renderDescription = (suggestion) => {
      var regEx = new RegExp(searchText, "gi");
      return suggestion.replaceAll(regEx, `<span>${searchText}</span>`);
   }

   const RenderItem = (result) => {
      const listing = result?.result;
      return (
         <div className={styles.item} key={listing?.DocumentId}>
            <Link href={listing?.DocumentURI}>
               <h3 className={styles.itemName}>{listing?.DocumentTitle?.Text}</h3>
            </Link>
            <div className={styles.itemDescription} dangerouslySetInnerHTML={{ __html: renderDescription(listing?.DocumentExcerpt?.Text) }}>
            </div>
            <Link href={listing?.DocumentURI} className={styles.itemLink}>
               {listing?.DocumentURI}
            </Link>
         </div>
      )
   }

   return (
      <div className={styles.resultsContainer}>
         {results.map((result, index) => <RenderItem key={index} result={result} /> )}
      </div>
   )
}