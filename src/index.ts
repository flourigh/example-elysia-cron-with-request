import { Elysia } from "elysia";

import tokenCron from "./cron/tokenCron";

process.env.TZ = "America/Sao_Paulo";

const TOKEN_FILE = Bun.file("files/token.txt")

new Elysia()
  .get("/", () => TOKEN_FILE)
	.use(tokenCron)
	.listen(3000)
