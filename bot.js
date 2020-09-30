const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
var önEk = ayarlar.prefix;
var prefix = ayarlar.prefix;

client.on("ready", () => {
  console.log(`Bot suan bu isimle aktif: ${client.user.tag}!`);
});

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};


require("./util/eventLoader")(client);

client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (ayarlar.sahip.includes(message.author.id)) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('debug', e => {
  console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
 });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);





client.on('guildMemberUpdate', async (oldMember, newMember) => {// chimp#0110
let guild = oldMember.guild || newMember.guild;
  
    let chimp = await guild.fetchAuditLogs({type: 'MEMBER_ROLES_UPDATE'});
  
    if(chimp) {
      
let asd = []

oldMember.roles.forEach(c => {
if(!newMember.roles.has(c.id)) {
require('quick.db').delete(`${guild.id}.${c.id}.${oldMember.id}`)
}
})
newMember.roles.forEach(c => {
if(!oldMember.roles.has(c.id)) {
require('quick.db').set(`${guild.id}.${c.id}.${newMember.id}`, 'eklendi')
}
  
})
    
    }
})// codare ♥





client.on('roleDelete', async role => {// chimp#0110
let guild = role.guild;
  
  let e = await guild.fetchAuditLogs({type: 'ROLE_DELETE'});
  let member = guild.members.get(e.entries.first().executor.id);
 // if(member.hasPermission("ADMINISTRATOR")) return;
        
  let mention = role.mentionable;
  let hoist = role.hoist;
  let color = role.hexColor;
  let name = role.name;
  let perms = role.permissions;
  let position = role.position;
  role.guild.createRole({
    name: name,
    color: color,
    hoist: hoist,
    position: position,
    permissions: perms,
    mentionable: mention
  }).then(async rol => {
    
  guild.members.forEach(async u => {
  const dat = await require('quick.db').fetch(`${guild.id}.${role.id}.${u.id}`)
  if(dat) {

  guild.members.get(u.id).addRole(rol.id)
  }
    
  })
client.channels.get('log kanal id').send(new Discord.RichEmbed().setAuthor(guild.name, guild.iconURL).setTitle(`Bir rol silindi!`)
.setDescription(`${rol.name} isimli rol ${member} tarafından silindi ve bende tekrardan rolü oluşturdum, önceden role sahip olan tüm kişilere rolü geri verdim.`))
  })
  
})





client.on("guildMemberAdd", member => {
  if (member.guild.id !== "758787509135605810") return; //tırnak işareti arasına sunucu id
  let eskiNick = member.user.username;
  let userinfo = {};
  userinfo.dctarih = moment
    .utc(member.user.createdAt)
    .format("DD : MM  : YYYY   HH:mm");
  userinfo.id = member.id;

  const id = "759179524293394433"; //Kanal id
  const channel = member.guild.channels.get(id);
const kürşat = new Discord.RichEmbed()
.setColor("BLACK")
  .setDescription(
    "  <@" +
      member.user.id +
      "> **Sunucumuza hoş geldin!. **Seninle Beraber __" +
      member.guild.members.size +
      "__ Kişiyiz!  ** \n\n\n <a:aaaaa:726786955026759780> Kayıt olduktan sonra kurallarımıza göz atmayı unutma!\n\n\n <a:aaaaa:726786955026759780> **Ses kanallarına girip teyit vererek kaydını oluşturabilirsin!**\n\n\n <a:aaaaa:726786955026759780> <@&758815422727454730> **Rolündeki Yetkililer Seninle İlgilenicektir.**\n\n\n <a:aaaaa:726786955026759780> Hesabın Açıldığı Tarih : **"  +userinfo.dctarih + "**\n\n\n     _Developed by Kayra_ <a:dansedenpatates:751720653744242739>"
  );
channel.sendEmbed(kürşat)
});








client.on("guildMemberAdd", async member => {
  let cezalilar = db.get(`cezalilar2.${member.guild.id}`);
  if (cezalilar.some(cezali => member.id === cezali.slice(1))) {
    setTimeout(() => {
      member.setRoles(["759754576038854657"]);
    }, 2000);
    member.guild.channels.get('759756100542922772').send(`${member} üyesi sunucuya girdi ve cezalıya atıldı!`);
    return
  };
});
