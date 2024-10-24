# ⚠️ Project M (ainda falta um nome melhor)

## 💭 Motivação

Eu e minha esposa dividimos as contas da casa. Nossa divisão de gastos consiste em entender quantos % do total de receitas da casa cada um tem, e usar essa mesma porcentagem para calcular quanto cada um deve pagar do total de gastos.

Fazer essa conta todo mês é chato e trabalhoso. Por isso criei essa ferramenta que faz isso automaticamente. Como é um caso de uso bastante comum, estou abrindo a ideia para quem mais precisa.

## 🎯 Objetivos

- Entender quantos % do total de receitas da casa cada um tem
- Calcular quanto cada membro deve pagar do total de gastos
- Conhecer melhor os gastos da casa
- Manter o histórico de gastos

## ⚒️ Tecnologias

Como eu também vou usar esse projeto para me manter atualizado com as tecnologias que gosto, decidi ser o mais enxuto possível na escolha das tecnologias. Minha ideia é utilizar as seguintes ferramentas:

### Desenvolvimento

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Drizzle ORM](https://drizzle.org/)
- [Zod](https://zod.dev/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Jose](https://www.npmjs.com/package/jose)

### Ferramental

- [GitHub](https://github.com/)
- [Vercel](https://vercel.com/)
- [Vercel Storage](https://vercel.com/)

## 🌎 Visão Geral

O projeto visa automatizar a seguinte situação:

*Uma casa 🏠 possui dois integrantes, Eduardo 🙋🏼‍♂️ e Letícia 🙋🏻‍♀️.*

### 1. Entender as receitas

- Eduardo 💁🏼‍♂️ tem uma receita de **R$ 10.000** e Letícia 💁🏻‍♀️ tem uma receita de **R$ 8.000**.
- A receita total da casa 🏠 é **R$ 18.000**.
- Concluímos então que Eduardo 💁🏼‍♂️ é responsável por **55%** da receita total da casa, e Letícia 💁🏻‍♀️ é responsável por **45%**.

### 2. Calcular os gastos proporcionais

- A casa têm 3 gastos
  - Financiamento: R$ 5.000 (pago por Eduardo 🙋🏼‍♂️)
  - Cartão de Crédito: R$ 5.000 (pago por Letícia 🙋🏻‍♀️)
  - Contas (luz, água, esgoto, condomínio, internet): R$ 2.000 (pago por Eduardo 🙋🏼‍♂️)
- O gasto total da casa 🏠 é R$ 12.000.
- Com as porcentagens definidas previamente, conclui-se que Eduardo 🤦🏼‍♂️ deveria pagar **R$ 6.600** do total dos gastos da casa, e Letícia 🤦🏻‍♀️ deveria pagar **R$ 5.400**.

### 3. Adaptar à realidade

- Eduardo 🙅🏼‍♂️ pagou **R$ 7.000** dos gastos da casa, enquanto Letícia 🙅🏻‍♀️ pagou **R$ 5.000**. 
- Eduardo 🤦🏼‍♂️ pagou **R$ 400** a mais do que ele deveria, e Letícia 🤷🏻‍♀️ pagou **R$ 400** a menos.
- Letícia 🤦🏻‍♀️ deve transferir para Eduardo 💁🏼‍♂️ o valor de **R$ 400**, garantindo que ambos paguem a porcentagem correta referente às suas receitas.