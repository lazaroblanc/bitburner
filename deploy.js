/** @param {NS} ns */
export async function main(ns) {
  let currentHackingLevel = ns.getHackingLevel();
  let exploitScriptName = 'money.js';
  let exploitTarget = 'iron-gym';

  let targets = ns.scan();
  //targets.unshift('home');
  targets = targets.filter((t) => t != 'darkweb');

  ns.tprint('Deploying to: ' + targets.join(', '));
  ns.tprint('No. of servers: ' + targets.length);

  for (let i = 0; i < targets.length; i++) {
    let target = targets[i];

    let requiredHackingLevel = ns.getServerRequiredHackingLevel(target);
    if (requiredHackingLevel > currentHackingLevel) {
      //ns.tprint('Required hacking level ' + requiredHackingLevel + ' is higher than current hacking level ' + currentHackingLevel)
      continue;
    }

    if (!ns.hasRootAccess(target)) {
      let openPortsRequired = ns.getServerNumPortsRequired(target);
      if (openPortsRequired > 3) {
        ns.tprint('Skipping... Open ports required: ' + openPortsRequired);
        continue;
      }
      if (ns.fileExists('BruteSSH.exe', 'home')) {
        ns.brutessh(target);
      }
      if (ns.fileExists('FTPCrack.exe', 'home')) {
        ns.ftpcrack(target);
      }
      if (ns.fileExists('relaySMTP.exe', 'home')) {
        ns.relaysmtp(target);
      }
      ns.nuke(target);
    }

    let isScriptAlreadyRunning = ns.isRunning(exploitScriptName, target, exploitTarget);
    
    let maxRam = ns.getServerMaxRam(target);
    let ramFree = maxRam - ns.getServerUsedRam(target);
    let scriptRamRequired = ns.getScriptRam(exploitScriptName);
    let threadCount = Math.floor(maxRam / scriptRamRequired);

    if (!isScriptAlreadyRunning || ramFree > scriptRamRequired) {
      ns.killall(target);
    
      ns.scp(exploitScriptName, target);
         
      ns.tprint('Target:           ' + target); 
      ns.tprint('Ram free:         ' + ns.formatNumber(ramFree));
      ns.tprint('Ram required:     ' + ns.formatNumber(scriptRamRequired));
      ns.tprint('Threads to spawn: ' + threadCount);
      
      for (let noThreads = 0; noThreads < threadCount; noThreads++) {
        ns.exec(exploitScriptName, target, 1, exploitTarget);
      }
      
    }
    else {
      //ns.tprint('Script is already running with correct args');
    }
  }
}