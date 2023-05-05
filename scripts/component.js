class component{
    constructor({
        name,
        slots = [], // array of slots
        snap = {x:0,y:0,port:"none"},
        asset = {default:"/assets/NULL.png", width:16, height:16},
        position = {x:0,y:0}
    }){
        this.name = name
        this.slots = slots
        this.snap = snap
        this.asset = asset
        this.position = position
    }
    intializeSlots(slotClass){
        this.slots = this.slots.map(s => new slotClass(s))
        return this.slots
    }
    checkBoundingBox({x, y}) { // boolean, checks if x,y is within bounding box
        let box = this.BoundingBox
        return (x >= box.x && y >= box.y) && (x <= box.x2 && y <= box.y2)
    }
    get boundingBox(){
        return {
            x:this.position.x,
            y:this.position.y,
            x2:this.position.x + this.asset.width,
            y2:this.position.y + this.asset.height,
        }
    }
    draw(canvas) {
        canvas.getContext('2d').drawImage(this.asset[state], this.position.x, this.position.y)
    }
    move({x,y}){
        this.position={x,y}
        this.slots.map(s => s.move({x,y}))
    }
}