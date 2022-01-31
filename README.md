# Sainsbury's Node/TypeScript back-end test

We have created an API which returns data for movies based on a search query. A user can search for e.g. `the simpsons`
and will get back the ID, title and overview for each match.

We're not looking for you to implement this in any particular way. The test is to get to know how you solve problems,
the kind of considerations you make when writing code, how you communicate, etc. Treat the task like you would your
everyday work. Don't stress about implementing every single thing: it's probably impossible to finish this whole task!

**The most important piece of advice is to talk about what you're doing, why you're doing it, any caveats/trade-offs
you're making, etc. Please ask questions if anything is unclear: this is a collaborative task, not a passive
observation!**

## Use cases

**Existing use cases**

```
Given a user searches for a movie ("the simpsons")
Then a response is returned that contains the movie title, ID and overview
```
```
Given a user searches for a movie ("foobarbazbat")
And that movie does not exist
Then an empty response is returned
```

**Your goal is to extend the API with the following use cases:**

```
Given a user searches for a TV show ("the office")
Then a response is returned that contains the title, ID, overview. 
```
```
Given a user searches for a TV show ("foobarbazbat")
And that TV show does not exist
Then an empty response is returned
```
```
Given a user searches for either a movie or TV show ("the simpsons")
Then a response is returned that contains the title, ID, overview and type ("movie" or "tv")
```
**Other improvements you may wish to consider:**

- Add type definitions for TMDB API search results, our own response type, anywhere else you see fit
- Refactor the search request so the API key is not hardcoded
- Add error handling, think about possible edge cases and how to mitigate them
- Improve reliability of tests
- Result pagination

Please feel free to suggest and make any other improvements you can identify.

## Architecture

The API is powered by a lambda function which is behind API Gateway. The function is configured and deployed by the
[Serverless framework](https://www.serverless.com/framework/docs).

We use [TMDb REST API](https://developers.themoviedb.org/3) as a data source. The API key
`c857fa67fba523ad3ce66df18e7ab279` has already been created for use in the task.

## Running the server

You can start the server with `yarn start`. It should watch for changes and restart when files are changed. The server
will start listening on port 3000, and you can make requests such as `http://localhost:3000/?query=the%20matrix`.

## Testing

Jest is installed. Feel free to use any other test runner or testing tools if you prefer.

You can run `yarn test` to start the test runner in watch mode.

## Notes

We use Yarn for dependency management. You can refer to [this handy cheatsheet](https://devhints.io/yarn) if you're more
familiar with NPM.

You can use any library, framework, etc that you like. There's no right or wrong way to complete the task.
