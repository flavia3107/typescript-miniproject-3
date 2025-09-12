import { Draggable } from '../models/drag-drop.js';
import { Project } from '../models/project.js';
import Component from './base-component.js';
import { autobind } from '../decorators/autobind.js';

// ProjectItem Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent) {
    console.log('DragEnd');
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    const header = this.element.querySelector('h2')!;
    header.textContent = "";
    const titleSpan = document.createElement("span");
    titleSpan.textContent = this.project.title;
    const peopleSpan = document.createElement("span");
    peopleSpan.className = 'people-number';
    const peopleText = document.createTextNode(`${this.project.people.toString()}  `);
    const icon = document.createElement("img");
    icon.src = "./people.svg";
    peopleSpan.appendChild(icon);
    peopleSpan.appendChild(peopleText);
    header.appendChild(titleSpan);
    header.appendChild(peopleSpan);
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
