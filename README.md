## Features

- React Frontend to interact with OpenInterface roombas; specifically the Cybot.

## Getting Started

### Prerequisites

To run this app, you will need to have [Deno](https://docs.deno.com/runtime/)
installed. Template from vite-react-deno repository. 

### Installation

1. Clone the repository created to your local machine.

```sh
git clone https://github.com/sheldoncork/cybot-web.git
cd cybot-web
```

2. To install the dependencies for the frontend and backend, run the following
command:

```sh
deno install
```


## Run the dev server with vite

The app uses a Vite dev server to run in development mode. To start the dev
server, run the following command:

```sh
deno run dev
```

## Build the app

To build the app for production, run the following command:

```sh
deno run build
```

## Run the backend server

The backend server uses Deno and the Oak framework to serve the built React app.
To start the backend server, run the following command:

```sh
deno run serve
```

## Project Structure

```sh
. 
├── client 
│   ├── dist 
│   ├── public 
│   └── src 
│       ├── App.tsx 
│       └── main.tsx 
└── server 
    ├── main.ts 
    ├── main_test.ts 
    └── util 
        └── routeStaticFilesFrom.ts
```

- `App.tsx`: The main React component
- `main.tsx`: The entry point for the React app
- `main.ts`: The entry point for the Deno server
- `main_test.ts`: The test file for the Deno server
- `routeStaticFilesFrom.ts`: A utility function to serve static files
- `dist`: The output directory for the built React app
- `public`: The public directory for the React app

## Points of note

The React app is contained in the `client` directory. This is also where Vite
will install its dependencies and build the app.

There is a `vite.config.ts` file in the root of the project that configures Vite
to build the app in the `client/dist` directory and serve the app on port 3000.

The `deno.json` file contains the tasks to run the dev server, build the app,
and serve the app, along with the dependencies and the compiler configuration
required to use JSX and React.

The Deno server is contained in the `server` directory. The server serves the
built React app from the `client/dist` directory and listens on port 8000. This
is what should be used in production.

## Deploying

You can deploy the app with [Deno Deploy](https://dash.deno.com/new_project).

1. Link your github account
2. Select the repository
3. Give the project a name
4. Set the "Build Step" to `deno task build`
5. Set the entry point to `./server/main.ts`
6. Click 'deploy project'

## License

This project is licensed under the MIT License.
