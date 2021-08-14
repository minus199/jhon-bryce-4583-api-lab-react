import { ChangeEvent } from 'react';
import '../css/Toolbar.css'
import { LanguagesResponse } from '../data/api-response';

// isn't it nicer to know which props exactly we need to pass?
interface ToolbarProps {
    search: () => void
    langs: LanguagesResponse,
    isSearching: boolean,
    // this is how we describe an event handler function. the first argument is the event object(which is a change event on the select element, and it returns void)
    setLang: (e: ChangeEvent<HTMLSelectElement>) => void,
    searchTerm: string,
    setSearchTerm: (searchTerm: string) => void
    currentLang: string
}

export default function Toolbar(props: ToolbarProps) {
    const { search, langs, isSearching, searchTerm, setSearchTerm, currentLang, setLang } = props;

    return <header className="main-toolbar">
        <div className="search-controls">
            {/* controlled component */}
            <input type="search" id="search" name="search" placeholder="Search a word's definition"
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />

            <select id="language-selector" onChange={setLang} value={currentLang}>
                {/* Since we generate these elements dynamically, react requires use to give each a unique "key" */}
                {Object.keys(langs).map((langCode) => <option key={langCode} value={langCode}>{langs[langCode]}</option>)}
            </select>

            {/* todo: notice how we toggle the className to show the user if there's an ongoing search */}
            <span id="is-searching" className={isSearching ? "" : "indicator-hidden"}>Searching...</span>

            {isSearching ? null : <button onClick={search}>Go!</button>}
        </div>
    </header>;
}