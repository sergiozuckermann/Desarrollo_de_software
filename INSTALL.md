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

Something similar to the next message should be displayed in the Command Line Interface (CLI)

```bash
> mexicana-callcenter@0.0.0 dev
> vite


  VITE v5.2.9  ready in 169 ms

  ➜  Local:   https://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

## Environmental Variables

Create a .env file with the Amazon Web Services Identity and Access Management (IAM) Access Keys

<details>
1. Go to your Amazon Web Services IAM Managment Console 
2. Users
4. Select a user with the appropiate permissions
5. Go to security credentials
6. Scroll down to Access Keys
7. Click on create access keys
8. Fill the form
   1. CLI
   2. Tag
   3. Retrieve Access Keys
9. Save both Access and Secret Access Keys
10. Write them down to an .env file
    
    ```bash
    ACCESS_KEY_ID = YOUR_ACCESS_KEY_ID
    SECRET_ACCESS_KEY = YOUR_SECRET_ACCESS_KEY
    ```
</details>

Go to the root directory of the reposotory





