//import {ProcessGraphNode} from './Process

class ProcessGraph
{
  private nodeList : Array<ProcessGraphNode>;

  constructor()
  {
    this.nodeList = [];
  }

  public execute()
  {
    /*for(let i=0; i<this.nodeList.length; i++)
    {
      let node = this.nodeList[i];
      node.reset();
    }*/

    for(let i=0; i<this.nodeList.length; i++)
    {
      let node = this.nodeList[i];
      if(node.isReady())
      {
        node.execute();
      }
      else
      {
        console.log("node not ready");
      }
    }
  }

  public getNodes()
  {
    return this.nodeList;
  }

  public addNode(node : ProcessGraphNode)
  {
    this.nodeList.push(node);
  }

  public getNode(index : number)
  {
    return this.nodeList[index];
  }

  public connectNodes(outputNodeIndex : number, inputNodeIndex : number, outputPort : number, inputPort : number)
  {
    let outputNode = this.getNode(outputNodeIndex);
    let inputNode = this.getNode(inputNodeIndex);

    let connection = outputNode.getOutput(outputPort);
    inputNode.setInputConnection(connection, inputPort);
    connection.setDestination(inputNode);
  }
}
