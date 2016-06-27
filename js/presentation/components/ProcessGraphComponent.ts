import {Component, EventEmitter} from 'angular2/core';
import {ProcessGraphNodeComponent} from './ProcessGraphNodeComponent';
import {ProcessGraphEdgesComponent} from './ProcessGraphEdgesComponent';

declare var $ : any;

@Component({
    selector: 'process-graph',
    directives: [ProcessGraphNodeComponent, ProcessGraphEdgesComponent],
    providers: [],
    template: `

      <process-graph-edges
        [process-graph]="processGraph"
      ></process-graph-edges>

      <process-graph-node
        *ngFor="#node of processGraph.nodeList; #index = index"
        [process-graph-node]="node"
        [update-event]="updateEvent"
      ></process-graph-node>

      <div class="navbar-fixed">
        <nav>
          <div class="nav-wrapper grey lighten-4">
            <a href="#!" class="brand-logo"></a>
            <ul class="right hide-on-med-and-down">
              <li>
                <div class="switch">
                  <label>
                    Bearbeiten
                    <input type="checkbox" (click)="toggleMode()">
                    <span class="lever"></span>
                    Anzeigen
                  </label>
                </div>
              </li>

              <li><a class="grey-text text-darken-4" (click)="openModal()">Knoten hinzufügen</a></li>
              <li><a class="grey-text text-darken-4" (click)="toggleJasminePanel()">Jasmine</a></li>
            </ul>
          </div>
        </nav>
      </div>

      <div class="modal" id="adding-node-modal">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <h4 class="modal-title">Neuen Knoten hinzufügen</h4>
            <br><br>
            <div class="input-field">
              <select id="node-class-selection">
                <option *ngFor="#nodeClass of availableNodeClassList; #index = index"
                  [attr.value]="index">
                  {{nodeClass.name}}
                </option>
              </select>
              <label>Kathegorie</label>
            </div>

            <div class="modal-footer">
              <a href="#" (click)="closeModal()" class="modal-action modal-close waves-effect waves-green btn-flat">Schließen</a>
              <button type="button" class="btn btn-success" (click)="addNode()">Hinzufügen</button>
            </div>
          </div>
        </div>
      </div>
    `
})

export class ProcessGraphComponent
{
  private processGraph;
  private updateEvent;

  private jasmineOpened;
  private displayModeSelected;

  private availableNodeClassList;

  constructor()
  {
    this.updateEvent = new EventEmitter();
    this.availableNodeClassList = this.setupAvailableNodeClassList();
    this.processGraph = new ProcessGraph();

    this.jasmineOpened = false;

    let image = new Image();
    image.src = "res/img/cat.jpg";

    let that = this;
    image.onload = function()
    {
      that.processGraph.addNode(new ProcessGraphNodeViewDecorator(new ImageLoadingNode(image)));
    }
  }

  ngAfterViewInit()
  {
    $('select').material_select();
  }

  private setupAvailableNodeClassList()
  {
    let classes = [];

    classes.push(BoxFilterNode);
    classes.push(LaplacianOfGaussianNode);
    classes.push(SobelYFilterNode);

    classes.push(DilationNode);
    classes.push(ErosionNode);

    classes.push(AdditionNode);
    classes.push(SubtractionNode);

    classes.push(CloneNode);

    return classes;
  }

  addNode()
  {
    let classIndex = parseInt($('#node-class-selection').val());
    let nodeClass = this.availableNodeClassList[classIndex];
    this.processGraph.addNode(new ProcessGraphNodeViewDecorator(new nodeClass()));

    $('#adding-node-modal').closeModal();
  }

  openModal()
  {
    $('#adding-node-modal').openModal();
  }

  closeModal()
  {
    $('#adding-node-modal').closeModal();
  }

  toggleJasminePanel()
  {
    if(this.jasmineOpened)
    {
      $('.jasmine_html-reporter').hide();
      this.jasmineOpened = false;
    }
    else
    {
      $('.jasmine_html-reporter').show();
      this.jasmineOpened = true;
    }
  }

  toggleMode()
  {
    this.displayModeSelected = !this.displayModeSelected;

    if(this.displayModeSelected)
    {
      this.processGraph.execute();
      $('.draggable').draggable({ disabled: true });
    }
    else
    {
      this.processGraph.reset();
      $('.draggable').draggable({ disabled: false });
    }
  }
}
