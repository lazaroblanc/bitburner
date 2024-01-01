/** @param {NS} ns */
export async function main(ns) {
  let servers = ns.getPurchasedServers();
  let serverPurchaseLimit = ns.getPurchasedServerLimit();
  ns.tprint('Owned servers: ' + servers.length + '/' + serverPurchaseLimit);

  if (servers.length >= serverPurchaseLimit) {
    ns.tprint('Server limit reached!');
    ns.exit();
  }

  // 
  let maxNum = 0;
  for(let i = 0; i < servers.length; i++) {
      let num = parseInt(servers[i].split('-')[1]);
      if(num > maxNum) {
          maxNum = num;
      }
  }

  maxNum += 1;
  let newServerName = 'bitburn-' + maxNum.toString().padStart(2, '0');
  
  while (!ns.purchaseServer(newServerName, 2)) {
    ns.tprint('purchase of ' + newServerName + ' failed!');
    await ns.sleep(1000);
  };
}