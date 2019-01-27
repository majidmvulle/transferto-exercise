# transferto-exercise
TransferTo: Senior Software Engineer - Technical Test.

## Calcuco Calculator
The calculator has the following features.

- Performs basic calculations (add, subtract, multiple, divide).
- Perform square root, qubic root, power and factorial calculations.
- A report of the operations that have been performed. (Future addition would be to add a date picker to pick a range for reports rather than showing all).
- To access the calculator follow the deployment steps below. The webpage will be available at `http://localhost:81`. The report is reachable at `http://localhost:81`.
- The Calculator does all the calculations via an API. The API documentation is available here: [API Documentation](./src/docs/api.md)

### Calculator View
![Calculator](./src/docs/calculator.png?raw=true "Calculator")

### Report View (Basic)
![Report](./src/docs/report.png?raw=true "Report")

## Deployment
- You must have [Yarn](https://yarnpkg.com/en/), [Composer](https://getcomposer.org/) and [Docker](https://www.docker.com/) on the target machine.
- Clone the repo locally from [https://github.com/majidmvulle/transferto-exercise](https://github.com/majidmvulle/transferto-exercise). `git clone git@github.com:majidmvulle/transferto-exercise.git`
- Change into the directory `cd transferto-exercise`
- Run `./deploy.sh`. This will:
	- 	copy the .env file for environment variables
	-  run composer install
	-  generate the database and the tables
	-  generate the react.js front-end
	-  start up docker

Access the webpage at `http://localhost:81`.

## Technologies
- Backend: PHP ([Symfony 4 PHP Framework](https://symfony.com/))
- Frontend: [react.js](https://reactjs.org/), [Bootstrap 4](https://getbootstrap.com/)

