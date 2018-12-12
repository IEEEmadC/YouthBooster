import { Project } from './../../modals/project.modal';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProjectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectProvider {

  private projectsRef = this.db.list<Project>('projects');

  constructor(private db:AngularFireDatabase) {}

  getAllProjects() {
    return this.projectsRef;
  }

  addProject(project:Project) {
    return this.projectsRef.push(project);
  }

  getProject(pid:string) {
    let singleProjectRef = this.db.object<Project>('projects/' + pid);
    return singleProjectRef;
  }

  editProject(project:Project) {
    return this.projectsRef.update(project.key, project);
  }

}
