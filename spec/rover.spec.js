const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  //TEST 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    const testRover = new Rover(65)
    expect(testRover.position).toBe(65);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.generatorWatts).toBe(110);
  });
  //TEST 8
  it("response returned by receiveMessage contains the name of the message", function() {
  const shuttle = new Rover(87);
  const shuttleMessage = new Message('Systems Loading...');
  const shuttleResponse = shuttle.receiveMessage(shuttleMessage);
  expect(shuttleResponse.message).toBe('Systems Loading...');
  });
  //TEST 9
  it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
    const rocket = new Rover(35);
    const rocketCommand = [new Command('Air Start'), new Command('Blowoff')];
    const rocketMessage = new Message('Preparing all checks.', rocketCommand);
    const rocketResponse = rocket.receiveMessage(rocketMessage);
    expect(rocketResponse.results.length).toBe(2);
  });
  //TEST 10
  it('responds correctly to the status check command', function() {
    const clifford = new Rover(23)
    const redRover = [new Command ('STATUS_CHECK')];
    const redRoverOver = new Message('Reading...', redRover);
    const cliffResponse = clifford.receiveMessage(redRoverOver);
    expect(cliffResponse.results[0]).toHaveProperty('roverStatus');
    expect(cliffResponse.results[0].roverStatus.position).toBe(23);
    expect(cliffResponse.results[0].roverStatus.mode).toBe('NORMAL');
    expect(cliffResponse.results[0].roverStatus.generatorWatts).toBe(110);
  });
//TEST 11
  it('responds correctly to the mode change command', function() {
    const roRover = new Rover(71);
    const roCommand = [new Command('MODE_CHANGE', 'LOW_POWER')];
    const roMessage = new Message('Gauging checks...', roCommand);
    const roResponse = roRover.receiveMessage(roMessage);
    expect(roResponse.results[0].completed).toBe(true)
    expect(roRover.mode).toBe('LOW_POWER')
  });
  //TEST 12
  it('responds with a false completed value when attempting to move in LOW_POWER mode', function() {
    const falseRover= new Rover(44)
    // Set commands to change mode and then to attempt to move the rover's position
    const falseCommand = [new Command ('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 8764677)];
    const falseMessage = new Message('Scanning...', falseCommand);
    const falseResponse = falseRover.receiveMessage(falseMessage);
    // Mode change should go through
    expect(falseResponse.results[0].completed).toBe(true);
    // Move should fail on low power mode
    expect(falseResponse.results[1].completed).toBe(false);
  });
  //TEST 13
  it('responds with the position for the move command', function() {
    const lastRover= new Rover(92)
    const lastCommand = [new Command ('MOVE', 2784947)];
    const lastMessage = new Message('Moving...', lastCommand);
    const lastResponse = lastRover.receiveMessage(lastMessage);
    expect(lastResponse.results[0].completed).toBe(true);
    expect(lastRover.position).toBe(2784947)
  });
});
