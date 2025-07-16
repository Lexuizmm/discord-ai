const { Client, GatewayIntentBits } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const DISCORD_BOT_TOKEN = 'OTY4ODIxNjYwMTM0MzA1ODAy.GDqQI3.Qd0ab4pVRDm50bCFSAgsLjLG1wkknrye23D8ug';
const GEMINI_API_KEY = '';

client.on('ready', () => {
  console.log(`Bot aktif: ${client.user.tag}`);
  client.user.setStatus("idle")
  client.user.setActivity("Bot Studio ??")
  });

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('.ai ')) {
    const userPrompt = message.content.replace('.ai ', '');

    const triggerPhrases = [
      'sen kimsin',
      'seni kim yapt覺',
      'kimsin',
      'kim taraf覺ndan yap覺ld覺n',
      'kim geli?tirdi seni',
      'senin yarat覺c覺n kim'
    ];

    if (triggerPhrases.some(phrase => userPrompt.toLowerCase().includes(phrase))) {
      message.reply('Ben Casper A襤 Lexuizm, Denizloki taraf覺ndan geli?tirildim nas覺l yard覺mc覺 olabilirim?');
      return;
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: userPrompt }]
        }]
      })
    });

    const data = await response.json();
    let reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Cevap al覺namad覺.";

    if (reply.length > 2000) {
      reply = reply.slice(0, 1997) + '...';
    }

    message.reply(reply);
  }
});

client.login(DISCORD_BOT_TOKEN);