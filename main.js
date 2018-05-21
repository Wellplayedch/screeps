var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');

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
  }

  var minimumNumberOfHarvesters = 10;
    var minimumNumberOfUpgraders = 5;
   //zählt sämtliche Harvester mit der Rolle 'Harvester'
  var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role== 'harvester');
    //zählt sämtliche Harvester mit der Rolle 'Upgrader'
  var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role== 'upgrader');
  var name = undefined;
     console.log("Anzahl Harvester / Upgrader:" + numberOfHarvesters + " - " + numberOfUpgraders);

if (numberOfHarvesters < minimumNumberOfHarvesters) {
  name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
      {role:'harvester', working: false});
}

if (numberOfUpgraders < minimumNumberOfUpgraders) {
    name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE], undefined,
        {role:'upgrader', working: false});
}
  //if name is NOT an errorcode then put out the new creeps name
//*  if (!(name < 0)) {
//      console.log ("Spawned new creep: " +name);
//  }
};