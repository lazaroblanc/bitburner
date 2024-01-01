/** @param {NS} ns */
export async function main(ns) {
  let targets = ns.scan();

  targets = targets.filter((t) => !ns.getPurchasedServers().includes(t));
  targets = targets.filter((t) => t != 'darkweb');

  ns.tprint('Targets: ' + targets.join(', '));

  let currentHackingLevel = ns.getHackingLevel();

  for (let i = 0; i < targets.length; i++) {
    let target = targets[i];

    if (ns.getServerRequiredHackingLevel(target) > currentHackingLevel) {
      continue;
    }

    let targetMoneyAvailable = ns.getServerMoneyAvailable(target);
    let targetMaxMoney = ns.getServerMaxMoney(target);
    let targetMaxPayout = targetMaxMoney * ns.hackAnalyze(target);

    let growTime = ns.getGrowTime(target) / 1000 / 60;
    let weakenTime = ns.getWeakenTime(target) / 1000 / 60;
    let hackTime = ns.getHackTime(target) / 1000 / 60;

    ns.tprint('------------------------------------------------')
    ns.tprint('Target:                     ' + target);
    ns.tprint('Server security level:      ' + ns.getServerSecurityLevel(target));
    ns.tprint('Server security level base: ' + ns.getServerBaseSecurityLevel(target));
    ns.tprint('Server security level min:  ' + ns.getServerMinSecurityLevel(target));
    ns.tprint('Current money:              ' + ns.formatNumber(targetMoneyAvailable));
    ns.tprint('Max money:                  ' + ns.formatNumber(targetMaxMoney));
    ns.tprint('Max payout:                 ' + ns.formatNumber(targetMaxPayout));
    ns.tprint('Time to grow:               ' + ns.formatNumber(growTime, 2) + ' mins');
    ns.tprint('Time to weaken:             ' + ns.formatNumber(weakenTime, 2) + ' mins');
    ns.tprint('Time to hack:               ' + ns.formatNumber(hackTime, 2) + ' mins');
  }
}