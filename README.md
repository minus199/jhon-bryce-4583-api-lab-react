# Running
`npm install`

`npm start`

## Or

`yarn install`

`yarn start`

> Also, run the node js dictionary server from a seperate cmd window

# Exercises:
### branch/fork 1
- convert to class components

### In a seperate branch/fork:
- change the title of the page to the current search query. clear it to the original title when needed.
- when the user is focused on the search input field:
    - pressing the key `enter` should send the search.
    - pressing the `up`/`down` arrow keys will select the next/previous language in the select element.
- add an option for the user to clear recent searches.
- make sure that every searched word only appears in the search history **once**. also make sure it moves to the *top* of the list with a new date to match the actual time of the re-search.
- allow the user to **filter** the search history by date the user selected(with a date input).
    - for example, setting the date to 01/01/21 will only show searches done after that date. Searches that were done in 2020 and earlier will be filtered out.
- allow the user to **sort** recent searches by date or by search term.
- allow the user to toggle each definition in the search result(click on it, and it collapases/expandes for easier navigation)
    - > Hint: when clicking the element with the class "definition", toggle the siblings.
- do better error handling(remember - the user wont look in the console, and using alert is bad practice)
- use redux to manage the state(notice how the entire state is defined inside App -- lifted state up, makes it easier to use redux).
- use react router the save the search as a query param(for example, localhost:3000?query=hello&lang=en_US)
- save/load search history from local storage to the state
- keep the search history on the server, then load it to local storage(google: mdn localstorage) when the page loads and every time there is an update.
