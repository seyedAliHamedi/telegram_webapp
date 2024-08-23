const { Telegraf } = require("telegraf");
const bot = new Telegraf("7543470932:AAEJyK5pwfztvu0Avf23ikwAKkPq1YwR9oo");
bot.start((ctx) =>
  ctx.reply("Welcome :))))))))", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "web app",
            web_app: {
              url: "https://3bf2-216-9-227-22.ngrok-free.app",
            },
          },
        ],
      ],
    },
  })
);
bot.launch();
