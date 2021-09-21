// declare variables
const FPS = 1000;
var canvas, context;

const margin = 4;
const boxSize = 10;
canvas = document.getElementById("gameCanvas");
context = canvas.getContext("2d");
const xNumber = canvas.width/boxSize;
const yNumber = canvas.height/boxSize;
let nodesx = new Array();
const backColor = "#2d2d2b";
const fillColor = "#eae6df";
const someColor = "#d4cb8e";

class Node {
    constructor(x,y,prevNode = null){
        this.x = x;
        this.y = y;
        this.prevNode = prevNode;
        this.color = someColor;
        this.nextNodes = new Array();
        this.nextNode = null;
        this.visited = false; 
        this.path = false;
    }
    draw(){
        context.fillStyle = this.color;
        context.fillRect(this.x*boxSize+(margin/2),this.y*boxSize+(margin/2),boxSize-margin,boxSize-margin)
    }
    drawPrevLines(){
        if(this.prevNode!=null){
            context.fillStyle = fillColor;
            if(this.x>this.prevNode.x){
                context.fillRect(this.x*boxSize-(boxSize/2)+(margin/2),this.y*boxSize+(margin/2),boxSize-margin, boxSize-margin)
            } else if(this.x<this.prevNode.x){
                context.fillRect(this.x*boxSize+(boxSize/2)+(margin/2),this.y*boxSize+(margin/2),boxSize-margin, boxSize-margin)
            } else if(this.y>this.prevNode.y){
                context.fillRect(this.x*boxSize+(margin/2),this.y*boxSize-(boxSize/2)+(margin/2),boxSize-margin, boxSize-margin)
            } else if(this.y<this.prevNode.y){
                context.fillRect(this.x*boxSize+(margin/2),this.y*boxSize+(boxSize/2)+(margin/2),boxSize-margin, boxSize-margin)
            }
        }
        else{
            return;
        }
    }
    drawPrevLines2(){
        if(this.prevNode!=null){
            context.fillStyle = "red";
            if(this.x>this.prevNode.x){
                context.fillRect(this.x*boxSize-(boxSize/2)+(margin/2),this.y*boxSize+(margin/2),boxSize-margin, boxSize-margin)
            } else if(this.x<this.prevNode.x){
                context.fillRect(this.x*boxSize+(boxSize/2)+(margin/2),this.y*boxSize+(margin/2),boxSize-margin, boxSize-margin)
            } else if(this.y>this.prevNode.y){
                context.fillRect(this.x*boxSize+(margin/2),this.y*boxSize-(boxSize/2)+(margin/2),boxSize-margin, boxSize-margin)
            } else if(this.y<this.prevNode.y){
                context.fillRect(this.x*boxSize+(margin/2),this.y*boxSize+(boxSize/2)+(margin/2),boxSize-margin, boxSize-margin)
            }
        }
        else{
            return;
        }
    }
    visit(){
        this.color = someColor;
        this.visited = true;
    }

    visit2(){
        this.path = true;
        this.color = "red";
        this.visited = true;
    }
    isVisited(){
        return this.visited;
    }
    unvisit(){
        this.color = fillColor;
        this.visited = false;
        this.path = false;
    }
    pop2(){
        this.path = false;
        this.color = fillColor;
        let node = this.prevNode;
        return node;
    }
    pop(){
        this.color = fillColor;
        let node = this.prevNode;
        return node;
    }
    setPrevNode(prevvNode){
        this.prevNode = prevvNode;
    }
    setNextNode(nexxtNode){
        this.nextNodes.push(nexxtNode);
        this.nextNode = nexxtNode;
    }
}


for (let x=0; x<xNumber; x++){
    let nodesy = new Array();
    nodesx.push(nodesy);
    for(let y=0;y<yNumber;y++){
        nodesy.push(new Node(x,y));
    }
}



let currentNode = nodesx[0][0]; 
currentNode.visit();
let x = currentNode.x;
let y = currentNode.y; 
// load canvas

 // set up interval (game loop)
 let cMap = setInterval(createMap, 1000 / FPS);
 let sMap = null;
 // ball starting position
 bx = canvas.width / 2;
 by = canvas.height / 2;
 

 function getUnvisitedNeighbors(ix,iy){
     unvisitedNeighbors = new Array();
     let node = checkUnvisitedNode(ix+1,iy)
     if(node!=null){
         unvisitedNeighbors.push(node);
     }
     node = checkUnvisitedNode(ix,iy+1)
     if(node!=null){
         unvisitedNeighbors.push(node);
     }
    node = checkUnvisitedNode(ix-1,iy)
     if(node!=null){
         unvisitedNeighbors.push(node);
     }
     node = checkUnvisitedNode(ix,iy-1)
     if(node!=null){
         unvisitedNeighbors.push(node);
     }
     return unvisitedNeighbors;
 }

function checkUnvisitedNode(ix, iy){
    if(ix<0 || iy<0 || ix>=xNumber || iy>=yNumber){
        return null;
    }else if(!nodesx[ix][iy].isVisited()){
        return nodesx[ix][iy];
    }
    else{
        return null;
    }
}


function move(node){
//check the currentNodes unvisited neighbors
    if (node === null){
        clearInterval(cMap);
        currentNode = nodesx[0][0];
        dMap = setInterval(drawMap, 1000 / FPS);
        return;
    }
    let unv = getUnvisitedNeighbors(node.x, node.y)
    let arr = new Array();
    if (unv.length === 0){
        node = node.pop();
    }
    else{
        let nextnode = unv[Math.floor(Math.random() * unv.length)]
        nextnode.setPrevNode(node);
        node.setNextNode(nextnode);
        nextnode.visit();
        node = nextnode;
    }
    return node;
}

function drawMap(){
    nodesx.forEach(nodesy => {
        nodesy.forEach(node =>{
            if (node!=null){
                context.fillStyle = node.color;
                context.fillRect(node.x*boxSize+(margin/2),node.y*boxSize+(margin/2),boxSize-margin,boxSize-margin)
            }
        })
    })
    clearInterval(dMap);
}
 // update function
 function createMap() {
     currentNode = move(currentNode);
    //items.forEach((item) => console.log(item.textContent));
    
     // draw background and ball
     context.fillStyle = backColor;
     context.fillRect(0, 0, canvas.width, canvas.height);
     /*context.fillStyle = "white";
     context.fillRect(bx - bs / 2, by - bs / 2, bs, bs);*/
    nodesx.forEach(nodesy => {
        nodesy.forEach(node =>{
            if (node!=null){
                node.draw();
            }
        })
    })
    nodesx.forEach(nodesy => {
        nodesy.forEach(node =>{
            if (node!=null){
                node.drawPrevLines();
            }
        })
    })
}

let rect = canvas.getBoundingClientRect();
let startEnd = null; 


function drawNode(event){
    if(sMap!=null){
        clearInterval(sMap);
    }
    x = event.clientX-rect.left;
    y = event.clientY-rect.top;
    x = Math.floor(x/boxSize);
    y = Math.floor(y/boxSize);
    currentNode = nodesx[0][0];
    nodesx.forEach(nodesy => {
        nodesy.forEach(node =>{
            if (node!=null){
                node.unvisit();
            }
        })
    })
    nodesx[x][y].color = "black";
    nodesx[x][y].draw();
    startEnd=nodesx[x][y];
    currentNode.visit2();
    sMap = setInterval(solveMap, 1000 / FPS);
}


canvas.addEventListener("click",drawNode);




function getUnvNextNodes(node){
    let nextNodes = node.nextNodes;
    unv = new Array();
    nextNodes.forEach(n => {
        if (!n.isVisited()){
            unv.push(n);
        }
    })
    return unv;
}

function move2(node){
    let unv = getUnvNextNodes(node);
    if (unv.length === 0){
        node = node.pop2();
    }
    else{
        let nextnode = unv[Math.floor(Math.random() * unv.length)]
        nextnode.visit2();
        node = nextnode;
    }
    return node;
}


function solveMap(){
    if(currentNode===startEnd){
        context.fillStyle = backColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        nodesx.forEach(nodesy => {
            nodesy.forEach(node =>{
                if (node!=null){
                    node.draw();
                    node.drawPrevLines();
                    if(node.path===true){
                        node.drawPrevLines2();
                    }
                }
            })
        })
        clearInterval(sMap);
        return;
    }
    currentNode = move2(currentNode);
}
