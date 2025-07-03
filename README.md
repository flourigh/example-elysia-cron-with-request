# TOTP token generator Example Application with Cron

## Pacotes utilizados:
  - ElysiaJS (https://elysiajs.com/)
  - ElysiaCron (https://elysiajs.com/plugins/cron.html)
  - BunSH (https://bun.sh)
  - JSSha (https://www.npmjs.com/package/jssha)

## Configs:
  - TZ (https://bun.sh/guides/runtime/timezone)
  - ReadFile (https://bun.sh/guides/read-file/string)
  - WriteFile (https://bun.sh/guides/write-file/basic)

## Configure:
  Abra o arquivo `example-elysia-cron-with-request/src/cron/tokenCron.ts` e mude o `pattern` para o desejado, utilize padrão CRON para realizar a configração.

  Abra o arquivo `example-elysia-cron-with-request/src/cron/tokenCron.ts` e mude o `secret` para um outro desejado.

  Abra o arquivo `example-elysia-cron-with-request/src/cron/tokenCron.ts` e adicione o `period` em `totp` com o valor desejado.

## Funcionamento
  No arquivo `example-elysia-cron-with-request/src/cron/tokenCron.ts` está a função `totp` que recebe uma `secret` e opcionalmente um `period`.
  A `secret` serve para criar o token a cada intervalo do `priod` determinado, em caso de não atibuição de um `period`, o memso será de 30s.

  O `pattern` da Cron está configrado com `*/30 * * * * *` que no caso é 30s, ou seja, no 00s e no 30s de cada minuto.

  Neste intervalo, ou seja, 30s e 00s, a Cron irá salvar no arquivo `files/token.txt` o token gerado pela função `totp` e este pode ser lido realizando uma request GET no http://localhost:3000


# Elysia with Bun runtime

## Development
  To start the development server run:
  ```bash
    bun i
  ```
  ```bash
    bun dev
  ```

  or use NPM

  Open http://localhost:3000/ with your browser to see the result.