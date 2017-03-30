var harvesterRole = require('role.harvester');
var builderRole = require('role.builder');
var upgraderRole = require('role.upgrader');

module.exports.loop = function() {
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
  if (harvesters.length < 2) {
    var newName = harvesterRole.build(Game.spawns['Spawn1']);
    console.log('Spawning new harvester: ' + newName);
  }
  var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
  if (builders.length < 1) {
    var newName = builderRole.build(Game.spawns['Spawn1']);
    console.log('Spawning new builder: ' + newName);
  }
  var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
  if (upgraders.length < 1) {
    var newName = upgraderRole.build(Game.spawns['Spawn1']);
    console.log('Spawning new upgrader: ' + newName);
  }
  if(Game.spawns['Spawn1'].spawning) {
      var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
      Game.spawns['Spawn1'].room.visual.text(
          '🛠️' + spawningCreep.memory.role,
          Game.spawns['Spawn1'].pos.x + 1,
          Game.spawns['Spawn1'].pos.y,
          {align: 'left', opacity: 0.8});
  }


  for (var cn in Game.creeps) {
    var creep = Game.creeps[cn];
    if (creep.memory.role == 'harvester') {
      harvesterRole.run(creep);
    }
    if (creep.memory.role == 'builder') {
      builderRole.run(creep);
    }
  }
}
