/** @param {NS} ns */
export async function main(ns) {

  let currentNodeCount = ns.hacknet.numNodes();
  let maxNodeCount = ns.hacknet.maxNumNodes()

  while (true) {
    if (currentNodeCount < maxNodeCount) {
      ns.print('Trying to purchase a new node')
      ns.hacknet.purchaseNode()
    }

    for (let i = 0; i < ns.hacknet.numNodes(); i++) {
      ns.print('Attempting to purchase upgrades for node: ' + i)
      if (ns.hacknet.getNodeStats(i).level < 110) {
        ns.hacknet.upgradeLevel(i);
      }
      ns.hacknet.upgradeRam(i);
      ns.hacknet.upgradeCore(i);
    }

    await ns.sleep(1000);
  }
}