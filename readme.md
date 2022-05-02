# Desafio Brisalabs

## Tecnologias usadas

* Express
* Typescript
* Typeorm
* Postgres
* Insomnia
* REST

## Migrations

### Como criar as migrations

Usa o seguinte comando

`yarn typeorm migration:create src\db\migrations\NameMigration`

### Como executar as migrations

Para rodar usa o seguinte comando

`yarn typeorm migration:run`

Para reverter usa o seguinte comando

`yarn typeorm migration:revert`


## Rotas

### Cadastrando usuários


> **post** `/users`

Request
```
{
	"name": "User Test",
	"phone": "(88)988888888",
	"email": "includevalidemailhere@gmail.com"
}
```
Response
```
{
	"id": "8407e40c-630a-421a-a9aa-8190f649855f",
	"name": "User Test",
	"phone": "(88)988888888",
	"email": "includevalidemailhere@gmail.com"
}
```
### Listando usuários
> **get** `/users`

Response

```
[
	{
		"id": "8407e40c-630a-421a-a9aa-8190f649855f",
		"name": "User Test",
		"phone": "(88)988888888",
		"email": "includevalidemailhere@gmail.com"
	}
]
```

### Cadastrando chave pix

> **post** `/keyspix`

Request
```
{
	"valueKeyPix": "firstkeypix",
	"idUser": "8407e40c-630a-421a-a9aa-8190f649855f"
}
```
Response
```
{
	"id": "44487315-4d9c-4876-8c8e-2d23a8d5719a",
	"valueKeyPix": "firstkeypix",
	"idUser": "4dba037b-b42c-435b-9de3-59b13de064b7"
}
```

### Listando chaves pix

> **get** `/keyspix`

Response

```
[
	{
		"id": "39f41f42-c851-40b1-9013-f68bf43f9818",
		"valueKeyPix": "firstkeypix",
		"idUser": "8407e40c-630a-421a-a9aa-8190f649855f",
		"user": {
			"id": "8407e40c-630a-421a-a9aa-8190f649855f",
			"name": "User Test",
			"phone": "(88)988888888",
			"email": "includevalidemailhere@gmail.com"
		}
	},
	{
		"id": "4654b257-2e78-43a6-9396-fe03f0fb1b93",
		"valueKeyPix": "secondkeypix",
		"idUser": "8407e40c-630a-421a-a9aa-8190f649855f",
		"user": {
			"id": "8407e40c-630a-421a-a9aa-8190f649855f",
			"name": "User Test",
			"phone": "(88)988888888",
			"email": "includevalidemailhere@gmail.com"
		}
	},
	{
		"id": "0b2c72c3-10b6-4276-9df2-e38c4ffc3b8b",
		"valueKeyPix": "thirdkeypix",
		"idUser": "8407e40c-630a-421a-a9aa-8190f649855f",
		"user": {
			"id": "8407e40c-630a-421a-a9aa-8190f649855f",
			"name": "User Test",
			"phone": "(88)988888888",
			"email": "includevalidemailhere@gmail.com"
		}
	}
]
```





