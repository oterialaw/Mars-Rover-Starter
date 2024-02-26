class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
      if (!position) {
        throw Error("Position required.");
      }
    }
    receiveMessage(message){
      const returnArray = []
      if(message.commands) {      
         for(let i = 0; i < message.commands.length; i++){
            if(message.commands[i].commandType === 'MOVE'){ 
               if(this.mode === 'LOW_POWER'){
                  returnArray.push({completed: false})
               }else{
                  this.position = message.commands[i].value
                  returnArray.push({completed: true})    
               }
            }else if(message.commands[i].commandType === 'STATUS_CHECK'){ 
               returnArray.push({completed: true, roverStatus: {mode: this.mode , generatorWatts: this.generatorWatts, position: this.position}})
            }else if(message.commands[i].commandType === 'MODE_CHANGE'){
               this.mode = message.commands[i].value
               returnArray.push({completed: true})
            }else{
               returnArray.push({completed: false})
            }
         }
      }
      return {message: message.name, results: returnArray}
    }
}
module.exports = Rover;