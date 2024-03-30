import { Component, HostListener, OnInit } from '@angular/core';
import { INU_ICON } from './commons/components/icon/icons';
import { MenuLink } from './components/menu-links/menu-links.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'inugami-angular-components';
  mainPageStyleClass : string = 'page';
  displayType : string = 'large';

  icon : any = {
    inugami : INU_ICON.inugami,
    home : INU_ICON.home
  }

  menuLinks : MenuLink = {
    children : [
      {
        label: 'Tools',
        icon : INU_ICON.home,
        children : [
          {
            label: 'Icons',
            link: 'tools/icons',
            icon : INU_ICON.home,
          }
        ]
      },
      {
        label: 'Components',
        icon : INU_ICON.puzzle,
        children : [
          {
            label: 'Timeline',
            link: 'components/timeline',
            icon : INU_ICON.timegraph,
          }
        ]
      }
    ]
  };

  ngOnInit(): void {
    this.defineWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.defineWindowSize();
  }

  private defineWindowSize(){
     const width = window.innerWidth;

     if(width < 600){
        this.displayType = 'small';
        this.mainPageStyleClass = 'page small-display';
     }
     else if(width < 1020){
      this.displayType = 'medium';
      this.mainPageStyleClass = 'page medium-display';
     }
     else{
      this.displayType = 'large';
      this.mainPageStyleClass = 'page ';
     }
  }
}
