/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
module.exports = {
run: function(creep)   {

    //Switch state working to false wenn creep hat 0 Energie
    if (creep.memory.working == true && creep.carry.energy == 0) {
        creep.memory.working = false;
    }
    //otherwise if not working and at capacity set Status to TRUE
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
    }
    //If creep working, transfer energy to spawn, if not at spawn move to spawn.
    if (creep.memory.working == true) {
        //finds the next structures that can take energy that are mine (not including walls / roads)
        var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => s.energy < s.energyCapacity
        });
        if (structure != undefined) {
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
        }

        }
    }
    else {
        var source = creep.pos.findClosestByPath(FIND_SOURCES);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
}
};