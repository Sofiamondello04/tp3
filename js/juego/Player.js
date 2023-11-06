class Player {
    //constructor del jugador.
    constructor(context, name, playerNumber){
        this.context = context;
        this.name = name;
        this.playerNumber = playerNumber;
    }
    //retorna el nombre del jugador.
    getName(){
        return this.name;
    }
    //retorna el numero del jugador.
    getPlayerNumber() {
        return this.playerNumber;
    }
    //setea el nombre del jugador.
    setName(name){
        this.name = name;
    }
    
} 