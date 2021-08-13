import '../css/SearchHistory.css';
import RecentSearch from "../data/RecentSearch";

function SeachHistoryItem(props: {  onClick: (word: string) => void, searchTerm: RecentSearch }) {
    const { onClick, searchTerm } = props;

    return <li title={`Searched on ${searchTerm.date.toLocaleString()}`}>
        <span onClick={() => onClick(searchTerm.term)} className="search-item">
            {searchTerm.term}
        </span>
    </li>
}

export default function SearchHistory(props: { data: RecentSearch[], search: (word: string) => void }) {
    const searches = props.data;

    return <div className="search-history">
        {/* if no recent searches, show the text "No Recent Searches" */}
        <h3>{searches.length > 0 ? "" : "No"} Recent Searches</h3>

        <ul className="searches">
            {/* create an <li> from every search we have in our history */}
            {searches.map((searchTerm, i) => <SeachHistoryItem key={i} onClick={props.search} searchTerm={searchTerm} />)}
        </ul>
    </div>
}