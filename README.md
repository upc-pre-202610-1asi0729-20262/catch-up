# CatchUp

## Overview
This project is a news application that allows users to catch up on the latest news.

## Features
- Fetch News Sources.
- Fetch News Articles for the selected source.
- View Articles in a list.
- It shows for each article information like title, description, image.
- It allows users to share the article.

## Technologies
- Angular framework.
- Typescript language.
- Angular Material UI Component Library.
- Angular HTTP client.
- Angular Signals.
- Angular reactive state management.
- NGX-Translate library.
- NewsAPI.org service client.
- Logo.dev Logo service client.

## User Stories
The user stories can be found in the [docs/user-stories.md](docs/user-stories.md) file.

## Class Diagram
The class diagram can be found in the [docs/class-diagram.puml](docs/class-diagram.puml) file.

# Environment Variables
To run this project, you need to set up the following environment variables:
- `newsProviderApiKey`: Your API key for the NewsAPI.org service. You can obtain an API key by signing up at [NewsAPI.org](https://newsapi.org/).
- `logoProviderPublishableKey`: Your API key for the Logo.dev service. You can obtain an API key by signing up at [Logo.dev](https://logo.dev/).

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
