# finAPI 

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/italocc-git/finAPI-tests/blob/main/LICENSE) 

finAPI é uma API de finanças criada com NodeJS onde o usuário pode criar operações simples de contas bancárias como: saque , depósito e extrato.
Além da API , foram criados testes unitários e testes de integração utilizando a biblioteca Jest e Supertest respectivamente.

## Requisitos Funcionais 

<ul>
  <li>Deve ser possivel Criar uma conta. </li>
  <li>Deve ser possivel buscar o extrato bancário do Cliente.</li>
  <li>Deve ser possivel Realizar um depósito. </li>
  <li>Deve ser possivel realizar um saque.</li>
  <li>Deve ser possivel obter dados da conta do cliente.</li>
  <li>Deve ser possivel obter o saldo da conta.</li>
 </ul>
 
 ## Regras de negócio
 
 <ul>
  <li> Não deve ser possivel cadastrar uma conta com email já existente. </li>
  <li> Não deve ser possivel fazer depósito em uma conta não existente. </li>
  <li> Não deve ser possivel buscar extrato em uma conta não existente. </li>
  <li> Não deve ser possivel fazer um saque em uma conta não existente. </li>
  <li> Não deve ser possivel fazer saque quando o saldo for insuficiente. </li>
  
 </ul>
 
 # Tecnologias utilizadas 
 
 ## Backend :
 <li> Bscryptjs |jsonwebtoken </li>
 <li> Express </li>
 <li> Jest | ts-jest | supertest </li>
 <li> Tsyringe </li>
 <li> Typeorm </li>
 <li> Uuid </li>
 <li> cors </li>
 
 # Como executar o projeto
 
 Pré-requisitos: npm / yarn

```bash
# clonar repositório
git clone https://github.com/italocc-git/finAPI-tests.git

# entrar na pasta do projeto finAPI-tests
cd finAPI-tests

# instalar dependências
yarn install / npm install

# executar o projeto
yarn dev / npm run dev

# executar os testes
yarn test / npm run test

```
 
# Autor

Italo Costa Cavalcante

https://www.linkedin.com/in/italo-costa-cavalcante/
