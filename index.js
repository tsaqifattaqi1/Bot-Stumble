const fetch = require('node-fetch');
const moment = require('moment');
const chalk = require('chalk');
const rs = require('readline-sync');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async () => {

console.clear()
console.clear() 
console.log(`

░██████╗████████╗██╗░░░██╗███╗░░░███╗██████╗░██╗░░░░░███████╗
██╔════╝╚══██╔══╝██║░░░██║████╗░████║██╔══██╗██║░░░░░██╔════╝
╚█████╗░░░░██║░░░██║░░░██║██╔████╔██║██████╦╝██║░░░░░█████╗░░
░╚═══██╗░░░██║░░░██║░░░██║██║╚██╔╝██║██╔══██╗██║░░░░░██╔══╝░░
██████╔╝░░░██║░░░╚██████╔╝██║░╚═╝░██║██████╦╝███████╗███████╗
╚═════╝░░░░╚═╝░░░░╚═════╝░╚═╝░░░░░╚═╝╚═════╝░╚══════╝╚══════╝`) 
console.log(`${chalk.yellowBright(`Script punya hex, Gw cuman reedit:V`)}`) 
console.log(`${chalk.white(`
1 ${chalk.yellowBright(`Push Trophy`)} ${chalk.blue(`[Ronde 1]`)}
2 ${chalk.yellowBright(`Push Trophy`)} ${chalk.blue(`[Ronde 2]`)}
3 ${chalk.yellowBright(`Push Crown`)} ${chalk.blue(`[Ronde 3]`)}

${chalk.red(`Note: Masukan jeda minimal 4000 keatas dan run pake satu\nsession saja untuk menghindari banned\n`)}`)}`);
  
  const round = rs.question(`[+] Pilih Ronde  : `);
  const delay = rs.question(`[+] Masukan Jeda : `);
  const auth = rs.question('[+] Masukan kode Authentication!!! : ');
    console.log('');

   const GoStumble = (auth) => new Promise((resolve, reject) => {

  fetch('http://kitkabackend.eastus.cloudapp.azure.com:5010/round/finishv2/'+round, {
    method: 'GET',
    headers: {
      'authorization': auth
    }
  })
    .then(res => res.text())
    .then(data => {
      resolve(data);
    })
    .catch(err => {
      reject(err);
    });

});
  console.clear();
  console.log(`

░██████╗████████╗██╗░░░██╗███╗░░░███╗██████╗░██╗░░░░░███████╗
██╔════╝╚══██╔══╝██║░░░██║████╗░████║██╔══██╗██║░░░░░██╔════╝
╚█████╗░░░░██║░░░██║░░░██║██╔████╔██║██████╦╝██║░░░░░█████╗░░
░╚═══██╗░░░██║░░░██║░░░██║██║╚██╔╝██║██╔══██╗██║░░░░░██╔══╝░░
██████╔╝░░░██║░░░╚██████╔╝██║░╚═╝░██║██████╦╝███████╗███████╗
╚═════╝░░░░╚═╝░░░░╚═════╝░╚═╝░░░░░╚═╝╚═════╝░╚══════╝╚══════╝`);
  console.log(`Tunggu Sebentar!!!`)
  console.log('');

  while (true) {

    const result = await GoStumble(auth);
    if (!result) {

      console.log(chalk.red(`\r[ ${moment().format('HH:mm:ss')} ] Kode Authentication Telah Kadaluarsa!!!`));
      break;

    } else if (result.includes('User')) {

      const data = JSON.parse(result);
      const username = data.User.Username;
      const country = data.User.Country;
      const trophy = data.User.SkillRating;
      const crown = data.User.Crowns;

console.log(chalk.bgBlack(`\r${chalk.blue(`[ Time :  ${moment().format('HH:mm:ss')} ]`)}\n${chalk.yellowBright(`• User : ${username}`)}\n${chalk.yellowBright(`• Region : ${country}`)}\n${chalk.yellowBright(`• Trophy : ${trophy}`)}\n${chalk.yellowBright(`• Crown : ${crown}`)}\n${chalk.greenBright(`• Status : Succes√`)}`));
      await sleep(`${delay}`);

    } else if (result == 'BANNED') {
      console.log(chalk.bgRed(`Akun anda telah di banned🤡`));
     break;
    }
  }


})();
