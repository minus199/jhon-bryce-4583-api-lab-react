import '../css/App.css';
import { useEffect, useState } from 'react';
import SearchHistory from './SearchHistory';
import Dictionary, { DictionaryEntryList } from './Dictionary';
import Toolbar from './Toolbar';
// notice how we can split all the logic that handles communication with the server into a seperate file/module
import { searchWordInDictionary, fetchLangs, fetchRecentSearches } from '../api';
import { DictionaryResponse, LanguagesResponse } from '../data/api-response';
import RecentSearch from "../data/RecentSearch";

function App() {
  // we only set the state here
  // lift the state up!! this way, several components can "know", for example, if there's a search happening. 
  // notice how we can specify the type of the state inside the <triangles>
  const [currentLang, setCurrentLang] = useState<string>("") //the value for the select field
  const [langs, setLangs] = useState<LanguagesResponse>({}) // available langauges we will get from the server
  const [searchTerm, setSearchTerm] = useState<string>(""); //the value for the search field
  const [isSearching, setIsSearching] = useState<boolean>(false); // this will control the "Searching..." text
  const [dictionaryContent, setDictionaryContent] = useState<DictionaryResponse[]>([]);
  const [searchHistory, setSearchHistory] = useState<RecentSearch[]>([]);

  // the last search should appear first in the list
  // we can also quite easily make it keep only one occurence of each search word(think about how you would do that. hint: use Array.prototype.filter)
  const addToSearchHistory = (word: string) => setSearchHistory([new RecentSearch(word), ...searchHistory])

  const search = (word: string) => {
    setIsSearching(true); //show "searching..." to the user
    setSearchTerm(word); // if we clicked a recent search, we want to update the search input value
    setDictionaryContent([]); // clear the data before the search

    searchWordInDictionary(currentLang, word)
      .then(setDictionaryContent) // save the response inside the state
      .catch(reason => {
        //very minimal error handling, but of course we can and should do more. 
        alert(reason.message); // we can use this place in order to put the error inside the page instead of alerting it
      })
      .finally(() => {
        setIsSearching(false); // hide "searching..." text
        addToSearchHistory(word); //save current search to a list of searched words
      })
  }

  // the above 'search' function can be implemented using async/await like so(the two versions are the same):
  /* 
    const search = async () => {
      setIsSearching(true);
      setSearchTerm(word);
      setDictionaryItemData([]);

      try {
        const dictData = await searchWordInDictionary(currentLang, searchTerm)
        setDictionaryItemData(dictData);
      } catch (reason) {
        alert(reason.message);
      } finally {
        setIsSearching(false)
        addToLastSearch(word);
      }
    }
  */

  useEffect(() => {
    fetchRecentSearches().then(searches => setSearchHistory(searches))
   }, []);

  useEffect(() => { // this effect handles the concern of fetching the languages when the page loads
    fetchLangs()
      .then(langs => {
        setLangs(langs);
        setCurrentLang(`${Object.keys(langs)[0]}`); //choose the first language by default
      })
      .catch(reason => alert(reason.message));
  }, []); // this effect should only happen once in our case(when the element first loads)

  return (
    <div className="app">
      <Dictionary>
        <Toolbar langs={langs} search={() => search(searchTerm)}
          currentLang={currentLang} setLang={(e) => setCurrentLang(e.target.value)}
          isSearching={isSearching} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <SearchHistory data={searchHistory} search={search} />

        <DictionaryEntryList data={dictionaryContent} />
      </Dictionary>
    </div>
  );
}

export default App;
