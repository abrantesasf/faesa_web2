# Avaliação C2

Este é meu repositório para o projeto de desenvolvimento da **Avaliação
C2**.

## Pré-requisitos para rodar o projeto:
- Você deve ter o Docker e o Docker Compose (versões recentes) instalados;
- De preferência com sistema operacional Linux.

**Atenção**: se você não estiver usando Linux, terá que comentar a seção
do **Portainer** no arquivo `docker-compose-prod.yml`, pois está configurado
para rodar em Linux. Veja instruções a seguir.

## Como rodar o projeto:
- Faça o download do diretório `c2` e de todo o seu conteúdo (ou faça
  um clone deste repositório inteiro);
- Dentro do diretório `c2/backend` existe um arquivo para o Docker
  Compose, o `docker-compose-prod.yml`. Dê uma olhada nesse arquivo e:
  - Verifique se as portas utilizadas não causarão conflito com
    alguma porta já em uso no seu computador. As portas que estão
    configuradas são:
    - 27017 (para o MongoDB)
    - 8081 (para o Mondo-Express)
    - 8080 (para o Adminer)
    - 3005 (para o Node)
    - 9000 e 8000 (para o Portainer)
  - Se você está usando Linux, não precisa fazer mais nada.
  - Se você está usando Windows, precisará configurar o
    Portainer, pois está configurado para Linux. Como o
    Portainer não é necessário para este projeto, você pode
    até comentar todo esse serviço.
- Depois que você verificar as portas e o Portainer, abra um shell,
  vá para o direótio `c2/backend` e execute o comando: **`docker-compose -f docker-compose-prod.yml up -d`**
- Esse comando fará o download das imagens necessárias, construirá
  os containers (com as redes e volumes adequados) e, se tudo correr bem,
  você pode acessar a aplicação.
- Em execuções posteriores basta fazer `docker-compose start` e
  `docker-compose stop`.

## Como acessar a aplicação:
Como esta aplicação é só a API de backend, a maioria das interações (POST, PUT, DELETE) devem ser feitas através de arquivos JSON, com o uso do Postman ou do Insomnia.

Para as principais requisições GET, há um HTML com os links para as principais rotas da aplicação em:

* http://<hostnome ou IP>:3005 (raiz da aplicação)