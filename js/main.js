var harvesterRole = require('role.harvester');

module.exports.loop = function() {
  for (var cn in Game.creeps) {
    var creep = Game.creeps[cn];
    if (creep.memory.role == 'harvester') {
      harvesterRole.run(creep);
    }
  }
}
