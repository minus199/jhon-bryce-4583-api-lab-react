// convert json to typescript interfaces: http://www.json2ts.com/ 

// this file describes the response we get from the server when searching a word

export interface Phonetic {
    text: string;
    audio: string;
}

export interface Definition {
    definition: string;
    example: string;
    synonyms: string[];
    antonyms: string[];
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
}

export interface DictionaryResponse {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    origin: string;
    meanings: Meaning[];
}

// this interfaces describes the shape of any object with string keys and string values
// this is how our supported languages response looks like -- {langCode: langName}
export interface LanguagesResponse {
    [langCode: string]: string
}