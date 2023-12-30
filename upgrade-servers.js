/** @param {NS} ns */
export async function main(ns) {
  let servers = ns.getPurchasedServers();

  for (let i = 0; i < servers.length; i++) {
    let server = servers[i];

    let currentRam = ns.getServerMaxRam(server)
    
    let upgradeSuccessful = ns.upgradePurchasedServer(server, currentRam*2);

    ns.tprint('----------------------------');
    ns.tprint('Server: ' + server);
    ns.tprint('Current RAM: ' + currentRam);
    ns.tprint('Upgraded: ' + upgradeSuccessful);
   
  }
}