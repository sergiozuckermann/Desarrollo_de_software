# Installation Manual

## Install:
- Node.js
  - https://nodejs.org/

## Clone Repository 

To clone the repository, open your preferred Command Line Interface (CLI) and type the following command in the directory where you want to clone the repository:

```bash
git clone https://github.com/sergiozuckermann/Desarrollo_de_software.git
```

After cloning the repository, navigate into the folder:

```bash
cd ..\Desarrollo_de_software\mexicana-callcenter
```

## BACKEND

### Installation of dependencies

Open your preferred Command Line Interface (CLI) and navigate to the location 

```bash
cd ..\Desarrollo_de_software\mexicana-callcenter\backend
```
In that same location, execute the next command to install the dependencies:

```js
npm install
```
### Running the server

After having installed the dependencies, run the server with the command:

```js
node index.js
```

The next message should be displayed in the Command Line Interface (CLI)

```bash
Server is running at http://localhost:3000
```

## Frontend

### Installation of dependencies

Open your preferred Command Line Interface (CLI) and navigate to the location 

```bash
cd ..\Desarrollo_de_software\mexicana-callcenter\frontend
```
In that same location, execute the next command to install the dependencies:

```js
npm install
```

Once the installation has finished, run the server with the command:

```sh
npm run dev
```

Something similar to the next message should be displayed in the Command Line Interface (CLI).
Click on either of the two HTTPS links to be redirected to the Call Center Mexicana Web App.

```bash
> mexicana-callcenter@0.0.0 dev
> vite


  VITE v5.2.9  ready in 169 ms

  ➜  Local:   https://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

When entering the website for first time, the next message will appear. 

<img src="assets/warning.png" alt="warning" style="width:500px">

1. Click on Advanced
2. Proceed to localhost(unsafe)
3. You are in

<img src="assets/homepage.pgn" alt="homepage" style="width:500px">

## Environmental Variables

Create a .env file with the Amazon Web Services Identity and Access Management (IAM) Access Keys
    
```bash
ACCESS_KEY_ID = YOUR_ACCESS_KEY_ID
SECRET_ACCESS_KEY = YOUR_SECRET_ACCESS_KEY
```

Go to the root directory of the repository 





