import '../css/Dictionary.css';
import { DictionaryResponse } from "../data/api-response";
import RecentSearch from '../data/RecentSearch';
import { Meanings, Origin, Phonetics, Word } from "./dict-entry-content";
import SearchHistory from './SearchHistory';

interface DictionryEntryProps {
    index: number
    data: DictionaryResponse | null
}

function DictionaryEntry(props: DictionryEntryProps) {
    const data: DictionaryResponse | null = props.data;
    if (data === null) return null // no data so no rendering needed.

    return <div className="dictionary-entry">
        <div>
            <Word index={props.index} word={data.word} phonetic={data.phonetic} />
            <Origin content={data.origin} />
            <Phonetics content={data.phonetics} />
        </div>

        <Meanings content={data.meanings} />
    </div>
}

export function DictionaryEntryList(props: { data: DictionaryResponse[] }) {
    return <div className="dictinary-entries">
        {props.data.map((entry, i) => <DictionaryEntry key={i} index={i} data={entry} />)}
    </div>
}

interface DictionaryProps{
    searchHistory: RecentSearch[],
    search: (word: string) => void,
    dictionaryContent: DictionaryResponse[]
}

export default function Dictionary(props: DictionaryProps) {
    return <div id="dict-container">
        <SearchHistory data={props.searchHistory} search={props.search} />

        <DictionaryEntryList data={props.dictionaryContent} />
    </div>;
}