import { cron } from "@elysiajs/cron";

import { totp } from "../modules/totpModule";

const TOKEN_FILE = Bun.file("files/token.txt");

export default cron({
  name: "tokenCron",
  pattern: "*/30 * * * * *",
  protect: true,
  timezone: "America/Sao_Paulo",
  async run() {
    const TOKEN = await totp({
      secret: "JBSWY3DPEHPK3PXP",
    });

    await Bun.write(TOKEN_FILE, TOKEN);

    console.log(Date(), "\nToken: ", TOKEN);
  }
});
