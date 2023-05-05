class slot{
    constructor({
        name,
        port, // port type e.g. USB-A
        connectedComponent = undefined,
        position = {x:0, y:0, offsetX:0, offsetY:0},
        highlight = {x:0,y:0,x2:0,y2:0}
    }){
        this.name = name
        this.port = port
        this.connectedComponent = connectedComponent
        this.position = position
        this.highlight = highlight
    }
    distance({ x, y }) {
        let a = this.position.x - x
        let b = this.position.y - y
        let c = Math.sqrt(a * a + b * b)
        return c
    }
    isClose({ x, y },radius = 8) {
        return this.distance({ x, y }) < (radius / 4)
    }
    move({x,y}){
        this.position.x = x + this.position.offsetX
        this.position.y = y + this.position.offsetY
        // move connectedComponentAsWell
        if(this.connectedComponent) this.connectedComponent.move(this.position)
    }
}