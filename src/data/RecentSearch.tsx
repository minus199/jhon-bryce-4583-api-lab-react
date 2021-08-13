// this class just contains the data for every recent search in the list. but it can do more in the future if we need. 
export default class RecentSearch {
    // notice the readonly since we do not want something to change these values in the future.
    readonly term: string;
    readonly date: Date;

    // todo: when loading from the database, we want to inject the date. when creating a new item since there was a search, we want to automatically get the current date.
    constructor(term: string, searchDate?: Date) {
        this.term = term;
        this.date = searchDate || new Date();
    }
}
