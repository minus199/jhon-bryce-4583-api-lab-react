import { Definition as DefinitionResponse, Meaning as MeaningResponse, Phonetic as PhoneticResponse } from "../data/api-response";
import ReactAudioPlayer from 'react-audio-player';

//this file only contains pure components -- no state and no side effects. 
// basically - a component for every part of the json response from the server
export function Word(props: { index: number, word: string, phonetic: string }) {
    return <div className="top-word-and-phonetic">
        <span className="word entry-title-part">
            <span>{props.index + 1}. </span>
            <span>{props.word}</span>
        </span>
        <span>{props.phonetic}</span>
    </div>;
}

export function Origin(props: { content: string }) {
    return props.content
        ? <span className="origin entry-title-part">{props.content}</span>
        : null
}

// no need to export everything. right now this component only used in this file
function Phonetic(props: { content: PhoneticResponse }) {
    const { audio } = props.content;
    return <div className="phonetic entry-title-part">
        {/* see: https://www.npmjs.com/package/react-audio-player */}
        {audio ? <ReactAudioPlayer src={audio} controls /> : null}
    </div>
}

export function Phonetics(props: { content: PhoneticResponse[] }) {
    return <div className="phonetics">
        {props.content.map((phonetic, i) => <Phonetic key={i} content={phonetic} />)}
    </div>
}

function Synonyms(props: { data: string[] }) {
    const {data} = props;
    return <ul className="dict-sorted-list synonyms">
        {data.map((synonym, i) => <li key={i}>{synonym}</li>)}
    </ul>
}

function Antonyms(props: { data: string[] }) {
    const {data} = props;
    return <ul className="dict-sorted-list antonyms">
        {data.map((antonym, i) => <li key={i}>{antonym}</li>)}
    </ul>
}

function Definition(props: { shouldAddHR: boolean, data: DefinitionResponse }) {
    const { antonyms, synonyms, definition, example } = props.data

    return <div className="definition-container">
        {definition ? <div className="definition">{definition}</div> : null}
        {example ? <div className="example">{example}</div> : null}

        {/* conditional rendering -- for synonyms and antonyms, only render if the list is not empty */}
        {synonyms.length ? <Synonyms data={synonyms} /> : null}
        {antonyms.length ? <Antonyms data={antonyms} /> : null}

        {props.shouldAddHR ? <hr /> : null}
    </div>
}

function PartOfSpeech(props: { content: string }) {
    return props.content ?
        <span className="part-of-speech entry-title-part">{props.content}</span>
        : null;
}

function Meaning(props: { shouldAddHR: boolean, data: MeaningResponse }) {
    const { definitions, partOfSpeech } = props.data

    return <div className="definition-container">
        <div className="definitions">
            <PartOfSpeech content={partOfSpeech} />

            {definitions.map((definition, i, arrRef) =>
                <Definition data={definition} key={i} shouldAddHR={i < arrRef.length - 1} />)}
        </div>

        {props.shouldAddHR ? <hr /> : null}
    </div>
}

export function Meanings(props: { content: MeaningResponse[] }) {
    const {content} = props; 
    return <div className="meanings">
        {content.map((meaning, i, arrRef) =>
            // only add hr if not the last item in the list
            <Meaning key={i} data={meaning} shouldAddHR={i < arrRef.length - 1} />
        )}
    </div>
}
