//call the prototype function in prototype.spawn.js
require('prototype.spawn') ()
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    //clear memory, VERY important
    for (let name in Memory.creeps){
        if (Game.creeps[name] == undefined){
            //deletes the memory variable for the deceased creeps
            delete Memory.creeps[name];
        }
    }

    //cycled durch alle creeps durch, let ist eine schwächere version von var
for (let name in Game.creeps) {
    var creep = Game.creeps[name];
    // console.log(name + " is working:" + creep.memory.working)
    //ruft die funktion RUN auf innerhalb der roleharvester variable
    if (creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
        }
    else if (creep.memory.role == 'upgrader'){
        roleUpgrader.run(creep);
        }
    else if (creep.memory.role == 'builder'){
        roleBuilder.run(creep);
        }
    else if (creep.memory.role == 'repairer'){
        roleRepairer.run(creep);
    }
  }

var minimumNumberOfHarvesters = 6;
var minimumNumberOfUpgraders = 3;
var minimumNumberOfBuilders = 5;
var minimumNumberOfRepairers = 2;

//zählt sämtliche Harvester mit der Rolle n
var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role== 'harvester');
var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role== 'upgrader');
var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role== 'builder');
var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role== 'repairer');
//stores available energy including extensions
var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;
var name = undefined;

console.log("Nr of Hrv / Upg / Bld / Rep :" + numberOfHarvesters + " - " + numberOfUpgraders + " - " + numberOfBuilders  + " - " + numberOfRepairers);
if (numberOfHarvesters < minimumNumberOfHarvesters) {
    name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role:'harvester', working: false});
    name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
    }
else if (numberOfUpgraders < minimumNumberOfUpgraders) {
    //name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined, {role: 'upgrader', working: false});
    name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
    }
else if (numberOfBuilders < minimumNumberOfBuilders) {
    //name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined, {role:'builder', working: false});
    name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
    }
else if (numberOfRepairers < minimumNumberOfRepairers) {
    //name = Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, MOVE], undefined {role: 'repairer', working: false});
    name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
    }
  //if name is NOT an errorcode then put out the new creeps name
//*  if (!(name < 0)) {
//      console.log ("Spawned new creep: " +name);
//  }
};