/** @param {NS} ns */
export async function main(ns) {
  let target = ns.args[0];
  let securityThreshold = ns.getServerMinSecurityLevel(target);
  let moneyThreshold = ns.getServerMaxMoney(target);

  while (true) {
    if (Math.floor(ns.getServerSecurityLevel(target)) > securityThreshold) {
      await ns.weaken(target);
    }
    else if (ns.getServerMoneyAvailable(target) < moneyThreshold) {
      await ns.grow(target);
    }
    else {
      await ns.hack(target);
    }
  }  
}