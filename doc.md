## ANOTAÇÕES

1 - Na pasta Config, dentro do arquivo eu usei na linha 6 "MONGODB" como nome da variável pq é como eu uso no .env. Estou colocando essa anotação só para não dar conflito na sua env... 

2 - Em Dentro de Routes, em userRoutes, eu coloquei users, em todas as rotas. Como as rotas de users e de pacientes estão escritas da mesma forma, isso dá conflito na hora de usar no postman ou no insomnia. Então eu alterei

3 - Em APP.js, eu chamei a linha 6 para que as rotas de usuarios funcione. 