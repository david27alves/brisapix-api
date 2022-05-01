### Como criar as migrations

Roda o seguinte comando

yarn typeorm migration:create src\db\migrations\NomeDaMigration

### Como executar as migrations

yarn typeorm migration:run 

Para reverter roda o seguinte comando

yarn typeorm migration:revert 


### O que falta

- limitar o cadastro de chaves por usuário (máximo 3 chaves).

- na rota get transactions exibir os dados do id_user_enviou(estamostrando somente do que recebeu)

- na rota transactions exibir o valor da cheve que enviou e não o id

- a api não está aceitando valor ponto flutuante

