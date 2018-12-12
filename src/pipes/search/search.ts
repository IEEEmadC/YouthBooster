import { Pipe, PipeTransform } from '@angular/core';
import { ProjectProvider } from '../../providers/project/project';
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  constructor(public projectProvider : ProjectProvider){

  }
  transform(items: any[], terms: string,showSearch): any[] {
  showSearch=false;
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {

      let boo=false;

      if((it.title.toLowerCase().includes(terms))||(this.projectProvider.users[it.author].fullname.toLowerCase().includes(terms)))
      return true;
      else {

      for(let i=0;i<it.tags.length;i++)
      if(it.tags[i].toLowerCase().includes(terms))
      {
        boo=true;
        break;
      }
      return boo;
    }
    });

  }
}
