/** @param {NS} ns */
export async function main(ns) {
  let server = ns.args[0];

  while(true) {
    let minSecurityLevel = ns.getServerMinSecurityLevel(server);
    let currentSecurityLevel = ns.getServerSecurityLevel(server);
    let currentMoney = ns.getServerMoneyAvailable(server);
    let maxMoney = ns.getServerMaxMoney(server);

    ns.clearLog();
    
    ns.print('Server:                 ' + server);
    ns.print('Current Security Level: ' + currentSecurityLevel);
    ns.print('Minimum Security Level: ' + minSecurityLevel);
    ns.print('Current money:          ' + ns.formatNumber(currentMoney));
    ns.print('Max money:              ' + ns.formatNumber(maxMoney));

    await ns.sleep(1000);
  }
}