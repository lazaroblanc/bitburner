/** @param {NS} ns */
export async function main(ns) {
  async function getConnectedServers(currentServer, previousServer = '') {

    let requiredHackingLevel = ns.getServerRequiredHackingLevel(currentServer);
    let isHackable = ns.getHackingLevel() >= requiredHackingLevel;
    let maxMoney = ns.getServerMaxMoney(currentServer);
    let weakenTime = ns.getWeakenTime(currentServer) / 1000 / 60;
    
    if (currentServer != 'home' && (!isHackable || maxMoney == 0)) {
      //ns.tprint(`${currentServer} is not worth it`);
      return;
    }

    let connectedServers = ns.scan(currentServer);
    connectedServers = connectedServers.filter(s => s != previousServer);
    connectedServers = connectedServers.filter(s => s != 'home');
    connectedServers = connectedServers.filter(s => s != 'darkweb');
    
    if (currentServer != 'home') {
      ns.tprint('----------------------------------------');
      ns.tprint('Server:                 ' + currentServer);
      ns.tprint('Connected servers:      ' + connectedServers.join(', '));
      ns.tprint('Required hacking level: ' + requiredHackingLevel);
      ns.tprint(`Time to weaken:         ${ns.formatNumber(weakenTime, 2)} mins`);
      ns.tprint('Max money:              ' + ns.formatNumber(maxMoney));
    }
    
    if (connectedServers.length == 0) {
      return;
    }
    else {
      for (const server of connectedServers) {
        //ns.tprint('Recursive call with server: ' + server);
        await getConnectedServers(server, currentServer);
      }
    }
  }

  let currentServer = ns.getHostname();
  await getConnectedServers(currentServer);

}