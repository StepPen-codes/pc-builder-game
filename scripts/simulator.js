class simulator {
    constructor({canvas,components=[]}){
        this.canvas = canvas
        this.components = components // array of component objects
        this.Slots = [] // array of available slots
        this.selectedComponent = undefined
        this.selectionOffset = {x:0,y:0}

        this.getPortsFromComponents()

        this.canvas.setAttribute('height', '500')
        this.canvas.setAttribute('width', '500')
    }
    getPortsFromComponents(){
        this.components.map(
            component => component.slots.map( // for every components' slots
                slot => this.Slots.push(slot) // push them to this.Slots
            )
        )
    }
    spliceAndPushComponent(component){
        this.components.splice(this.components.indexOf(component),1)
        this.components.push(component)
    }
    SortComponentsBySelected(component){
        // use topological sort
        const sortedComponents = [] // this will record the sorted components
        const callStack = [] // this will record the queue of unsorted components
        const unsortedComponents = [...this.components.map(
            c => { return {component:c, visited:false} }
        )]
        for(item of unsortedComponents){
            if(item.visited) continue // if visited ignore
            let connectedComponents = item.component.slots.map( s => s.connectedComponent)
        }
  
    }
    onMouseDown(e) {
        let component =  this.components.filter( c => c.checkBoundingBox() )[0]
        if(!component) return 0
        
        this.selectedComponent = component
        // the selected component and all connected component must be on top of the array:pending (this.SortSelectedComponent)


        this.selectionOffset = {
            x: component.position.x - e.clientX,
            y: component.position.y - e.clientY
        }
    }
    onMouseMove(e){
        
    }
    onMouseUp(e){

    }
    getClosestSlot(){
        return this.Slots.filter( // ignore Slots with connectedComponents
            slot => !(slot.connectedComponents)
        ).sort( a,b => {
            let slot1 = a.distance(this.selectedComponent.position)
            let slot2 = b.distance(this.selectedComponent.position)
            if (slot1 > slot2) return 1;
            if (slot2 > slot1) return -1;
            return 0;
        })[0] // slots are sorted by distance, the closest is [0]

    }
    animate(){
        this.canvas.clearRect(0, 0, canvas.width, canvas.height)
        window.requestAnimationFrame(this.animate)
        components.map(component => component.draw(this.canvas))
    }
}