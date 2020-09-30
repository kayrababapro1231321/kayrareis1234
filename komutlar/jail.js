const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  // !cezalı @etiket
  let uye = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!uye) return message.reply(`Cezalıya atılacak üyeyi belirtmelisin!`);
  let cezaliRolu = "759754576038854657"; // CEZALI ROLÜNÜN ID
  let uyeRolu = "759739052181684266"; // ÜYE ROLÜNUN ID
  if (uye.roles.has(cezaliRolu)) {
    let cezalilar = db.get(`cezalilar2.${message.guild.id}`);
    cezalilar.filter(kisi => uye.id !== kisi.slice(1));
    db.set(`cezalilar2.${message.guild.id}`, cezalilar);
    uye.setRoles([uyeRolu]);
    message.reply('Belirtilen üye başarıyla cezalıdan çıkartıldı!');
  } else {
    uye.setRoles([cezaliRolu]);
    db.push(`cezalilar2.${message.guild.id}`, `a${uye.id}`);
    message.reply('Belirtilen üye başarıyla cezalıya atıldı!');
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'jail', 
  description: 'Cezalıya atar çıkarır.',
  usage: 'jail',
  kategori: 'kullanıcı'
};
