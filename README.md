# finAPI 

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/italocc-git/finAPI-tests/blob/main/LICENSE) 

finAPI is a finance API created with NodeJS where the user can create simple bank account operations such as: withdrawal, deposit and statement.
In addition to the API, unit tests and integration tests were created using the Jest and Supertest libraries respectively.

## Functional Requirements

<ul>
  <li>It should be possible to create an account. </li>
   <li>It must be possible to fetch the Customer's bank statement.</li>
   <li>It must be possible to make a deposit. </li>
   <li>It must be possible to perform a withdrawal.</li>
   <li>It must be possible to get customer account data.</li>
   <li>It should be possible to get the account balance.</li>
 </ul>
 
 ## Business rules
 
 <ul>
  <li> It should not be possible to register an account with an existing email address. </li>
   <li> It must not be possible to deposit into a non-existing account. </li>
   <li> It must not be possible to fetch a statement from a non-existing account. </li>
   <li> It must not be possible to withdraw money to a non-existing account. </li>
   <li> It should not be possible to withdraw when the balance is insufficient. </li>
  
 </ul>
 
 # Technologies
 
 ## Backend :
 <li> Bscryptjs |jsonwebtoken </li>
 <li> Express </li>
 <li> Jest | ts-jest | supertest </li>
 <li> Tsyringe </li>
 <li> Typeorm </li>
 <li> Uuid </li>
 <li> cors </li>
 
 # How to run the project
 
 Prerequisites: npm / yarn

```bash
# clone the repository
git clone https://github.com/italocc-git/finAPI-tests.git

# enter the project folder called 'finAPI-tests'
cd finAPI-tests

# install dependencies
yarn install / npm install

# run the project
yarn dev / npm run dev

# run the tests
yarn test / npm run test

```
 
# Author

Italo Costa Cavalcante

https://www.linkedin.com/in/italo-costa-cavalcante/
