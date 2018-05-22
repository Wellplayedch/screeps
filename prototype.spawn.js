module.exports = function () {
    StructureSpawn.prototype.createCustomCreep =
        function (energy, roleName){
        //Math.floor rounds down the amount of numberofParts, most expensive is 200
            var numberOfParts = Math.floor(energy / 200);
            //create a body array var
            var body = [];
            //add as many WORK parts to the array as there are numberofparts
            for (let i = 0; i < numberOfParts; i++){
                //push adds an object to the array
                body.push(WORK)
            }
            for (let i = 0; i < numberOfParts; i++){
                //push adds an object to the array
                body.push(CARRY)
            }
            for (let i = 0; i < numberOfParts; i++){
                //push adds an object to the array
                body.push(MOVE)
            }
            return this.createCreep (body, undefined, { role: roleName, working: false});
        };
};