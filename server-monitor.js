/** @param {NS} ns */
export async function main(ns) {
  let server = ns.args[0];

  while(true) {
    let minSecurityLevel = ns.getServerMinSecurityLevel(server);
    let currentSecurityLevel = ns.getServerSecurityLevel(server);
    let currentMoney = ns.getServerMoneyAvailable(server);
    let maxMoney = ns.getServerMaxMoney(server);
    let timeToWeaken = ns.getWeakenTime(server) / 1000 / 60;
    let timeToGrow = ns.getGrowTime(server) / 1000 / 60;
    let timeToHack = ns.getHackTime(server) / 1000 / 60;

    ns.clearLog();
    
    ns.print('Server:                 ' + server);
    ns.print('Current Security Level: ' + ns.formatNumber(currentSecurityLevel, 2));
    ns.print('Minimum Security Level: ' + minSecurityLevel);
    ns.print('Current money:          ' + ns.formatNumber(currentMoney));
    ns.print('Max money:              ' + ns.formatNumber(maxMoney));
    ns.print('Time to weaken:         ' + ns.formatNumber(timeToWeaken, 1) + ' mins');
    ns.print('Time to grow:           ' + ns.formatNumber(timeToGrow, 1) + ' mins');
    ns.print('Time to hack:           ' + ns.formatNumber(timeToHack, 1) + ' mins');

    await ns.sleep(1000);
  }
}