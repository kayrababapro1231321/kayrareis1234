//Erkek kayıt farklı dosyaya
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_NICKNAMES"))
    return message.channel.send(
      `❌ Bu Komutu Kullanabilmek için \`İsimleri Yönet\` Yetkisine Sahip Olmalısın!`
    );

let kullanici = message.mentions.users.first();
let isim = args.slice(1).join(' '); 
let member = message.mentions.members.first();

if(!member) return message.channel.send(
new Discord.RichEmbed()
.setColor('RED')//İstediğiniz Rengin İngilizcesi'ni '' yazan yere yazabilirsiniz!
.setTitle('HATA')
.setDescription('İsmi Değiştirilecek Kişiyi Etiketlemelisin!'))

if(!isim)return message.channel.send(
new Discord.RichEmbed()
.setColor('RED')//İstediğiniz Rengin İngilizcesi'ni '' yazan yere yazabilirsiniz!
.setTitle('HATA')
.setDescription('Yeni İsmi Yazmalısın Kişiyi Etiketlemelisin!'))
 
  member.removeRole('758788261589286944')//kayıtssız rol id
  member.addRole('758788261224382484')//erkek rolü id
const embed = new Discord.RichEmbed()

      .setColor('RED')//İstediğiniz Rengin İngilizcesi'ni '' yazan yere yazabilirsiniz!
      .setDescription(`**ARAMIZA BİR ERKEK ÜYE KATILDI!** \n\n**Aramıza Katılan Kullanıcı:** ${member.user} \n\n**ARAMIZA HOŞ GELDİN GÜZEL İNSAN**`)
client.channels.get('758793916379299862').send(embed)//genel sohbetin id'sini girerseniz daha iyi olur


message.guild.members.get(kullanici.id).setNickname(`${isim}`)
 return message.channel.send(
 new Discord.RichEmbed()
    .setColor('RED')//İstediğiniz Rengin İngilizcesi'ni '' yazan yere yazabilirsiniz!
    .setAuthor('Developed by Kayra')//botun ismini yada başka birşeyini yazabilirsiniz yada sunucu ismini falan herşeyi yazabilirsiniz
    .setTitle('Kayıt Yapıldı')
    .setDescription(`İsmi Değiştirilen ${member.user} \nYeni İsmi \`${isim}\` \nKız Rolü Verilen ${member.user}\n @Kız`)
    .setFooter('Developed by Kayra')//en alttaki açıklama kısmı  
)}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["erkek"],
  permLevel: 0
};
exports.help = {
  name: "k",
  description: "k",
  usage: "k"
};
//kız kayıt farklı dosyaya