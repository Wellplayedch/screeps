var roleBuilder = require('role.builder');
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
        //If creep working, start to build
        if (creep.memory.working == true) {
            //find next structure to repair that is below max HP and NOT a Wall
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
               filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });

            if (structure != undefined){
                if (creep.repair(structure) == ERR_NOT_IN_RANGE)
                    creep.moveTo(structure);
            }
            //if nothing to repair, do the builder role
            else {
                roleBuilder.run(creep);
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