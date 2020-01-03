# Developers Guide

Below is a step by step explanation of how to get your local environment set up to build and contribute to Classic Guild Bank.  This is written from the perspective of a Window's operating system, Classic Guild Bank can be run on any system, but your setup steps may need to differ.

## Prerequisites

You will need to install the following locally in order to run Classic Guild Bank

- [Git](https://git-scm.com/downloads) version control
- [Microsoft Sql Server 2019 Express Edition](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Node.js](https://nodejs.org/en/) version 12.10 or higher
- [.Net Core 2.2 SDK](https://dotnet.microsoft.com/download/dotnet-core)
- [Angular 8](https://angular.io/guide/setup-local): Really only need step 1 of this guide

You can develop in any IDE you want, however I prefer these:

- [Microsoft Visual Studio 2019 Community](https://visualstudio.microsoft.com/vs/) for C# development
- [Microsoft Visual Studio Code](https://code.visualstudio.com/) for Angular / TypeScript / Javascript development
- [SQL Server Managment Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15) for Database stuff (Optional if you use VS 2019)

## Getting the Code

Open a command prompt and navigate to the directory you wish to store the source code for this project at.

Run the command `git clone https://github.com/ClassicGuildBank/ClassicGuildBank.git` to clone the Classic Guild Bank repository into the current folder.

## Database and Server

Navigate to the `ClassicGuildBank` directory where you cloned the source code into.  Open up the API solution by double clicking on the _ClassicGuildBank.sln_ file. (If you aren't using visual studio the .sln file may not open depending on if your IDE recognizes it or not)

Rebuild the solution and make sure everything compiles with no errors. If there are build errors you are likely missing a prerequisite, ensure everything is installed correctly.

### Setting up the Database

Once the solution can be built we need to setup the database and seed it with some intial data. First we need to create a new local database on the SQL Server instance you previously installed.

- Connect to the local SQL Instance using either Visual Studio SQL Object Explorer or SQL Server Management Studio
(VS SQL Object Explorer can be found under `View -> SQL Object Explorer`)

- Create a new database called **ClassicGuildBankDb**

- Once the database is created, we need to apply the Database Migrations to correctly configure the Schema. 
  - To do this open up the NuGet Package Manager console from within Visual Studio. `Tools -> NuGet Package Manager -> Package Manager Console`
  - Ensure the ClassicGuildBank.Data project is selected in the dropdown
  - Run the command `update-database` to run the Entity Framework Migrations
- After the migrations have ran you'll want to browse out to the root of the repository and open up the `/ClassicGuildBank/Database` directory
- Open the `seed_items.sql` file, copy and run the script on the Database

The database should now be initialized and ready to be worked in.

### API Server

Once the database is initialized, there isn't much additional setup for the API that needs to be done. Make sure the ClassicGuildBank.Api is set as the startup project and then click 'Run' (or hit F5).

The project should start and you should have a webpage that opens and says

`Hello, this is the api server for ClassicGuildBank`

The api is now running locally on port 44375. (https://localhost:44375)


## Client Project

Navigate to the `ClassicGuildBank` directory where you cloned the source code into.  Open up the `classic-guild-bank` folder. This is where all of the client side code and angular project lives.

If you installed Visual Studio Code, you can easily launch that IDE from here by just right clicking the folder and saying `Open with code`.  If not, open up this workspace in whatever IDE you prefer.

With the terminal of your choice, navigate to this directory and run the following commands to get started. (Visual Studio Code has an integrated termial which will default to the current workspace directory)

- first run `node -v` and ensure you get back 12.10.X or higher. If it says `node` is not a valid command, you missed installing Node.js as a prerequisite.
- run `npm -v` and ensure the command is recognized. If not you'll need to install `Node Package Manager` as a prerequisite
- run `ng version` and ensure the `ng` command is recognized and you get a nice printout of the Angular CLI. If not then you missed installing the Angular CLI as a prerequisite
- run `npm install`  this will install all the required dependencies this project uses.  It may take a few minutes to run the first time you do it.
- Once all of the node packages are installed run `ng serve` which will build and run the angular project. 

Once the `ng serve` command is done you should see a message that the angular dev server is listening on port 4200.  Navigate to http://localhost:4200 and you should see the classic guild bank site loaded.

## Classic Guild Bank

Once you have the client and server running locally, you'll need to create an account within your local database.  This can be done by the normal registration workflow with one small change.

Fill out the registration as you normally would and click submit.  You'll probably get an exception in the API project as it fails to send out the confirmation email.

This project uses SendGrid to send out the registration email. We've removed our live access key from the configuration to prevent Spam from being sent out of our account.  You can either create your own SendGrid account and provide the access key within `appsettings.json`. Or simply ignore the error and manually mark your newly created account as email confirmed within the database.

Once you have your account confirmed, you should be able to log in and use the site as you normally would

## Conclusion

Thank you again for your interest in contributing. Once your environment is fully set up feel free to start tackling issues or working on your feature.  Please remember that **ALL** new features must be tied to an approved github issue before the pull request will be accepted.