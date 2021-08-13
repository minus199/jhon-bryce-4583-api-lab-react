import '../css/Dictionary.css';
import { DictionaryResponse } from "../data/api-response";
import {  Meanings, Origin, Phonetics, Word } from "./dict-entry-content";

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

export default function Dictionary(props: any) {
    return <div id="dict-container">
        {props.children}
    </div>;
}