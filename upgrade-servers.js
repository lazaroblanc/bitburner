/** @param {NS} ns */
export async function main(ns) {
  let servers = ns.getPurchasedServers();
  let startMoney = ns.getServerMoneyAvailable('home');

  let didUpgrades = false;
  for (let i = 0; i < servers.length; i++) {
    let server = servers[i];

    let currentRam = ns.getServerMaxRam(server)
    
    let upgradeSuccessful = ns.upgradePurchasedServer(server, currentRam*2);

    if (upgradeSuccessful) {
      didUpgrades = true;
      ns.tprint('Server: ' + server);
      ns.tprint('Old RAM: ' + ns.formatNumber(currentRam));
      ns.tprint('New RAM: ' + ns.formatNumber(currentRam*2));
      ns.tprint('-----------------------------------------------');
    }
    else {
      continue;
    }
  }

  if (didUpgrades) {
    let endMoney = ns.getServerMoneyAvailable('home');
    let moneySpent = startMoney - endMoney;
    ns.tprint('Spent $' + ns.formatNumber(moneySpent));
    ns.tprint('Spawning deploy script');
    ns.spawn('deploy.js');
  }
  else {
    ns.tprint('No servers available for upgrade');
  }

}