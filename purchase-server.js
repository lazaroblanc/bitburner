/** @param {NS} ns */
export async function main(ns) {
  let servers = ns.getPurchasedServers();

  if (ns.getPurchasedServerLimit()) {
    ns.tprint('Server limit reached!')
    ns.exit();
  }

  let maxNum = -1;

  for(let i = 0; i < servers.length; i++) {
      let num = parseInt(servers[i].split('-')[1]);
      if(num > maxNum) {
          maxNum = num;
      }
  }

  maxNum += 1;
  let newServerName = 'bitburn-' + maxNum;
  
  while (!ns.purchaseServer(newServerName, 32)) {
    ns.tprint('purchase of ' + newServerName + ' failed!');
    await ns.sleep(1000);
  };
}