import { Component, HostListener, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { INU_ICON } from 'inugami-components/icon';
import { MenuLink } from 'inugami-components/models';
import { TITLE } from './app.page.titles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // ==================================================================================================================
  // ATTRIBUTES
  // ==================================================================================================================
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
            label: 'BreakingNews',
            link: 'components/breaking-news'
          },
          {
            label: 'Clock',
            link: 'components/clock',
            icon : INU_ICON.clock
          },
          {
            label: 'Code',
            link: 'components/code'
          }
        ]
      },

      {
        label: 'SVG Components',
        icon : INU_ICON.puzzle,
        children : [
          {
            label: 'Timeline',
            link: 'svg/timeline',
            icon : INU_ICON.timegraph,
          }
        ]
      },


      {
        label: 'Services',
        icon : INU_ICON.puzzle,
        
      }
    ]
  };

  
  
  // ==================================================================================================================
  // INIT
  // ==================================================================================================================
  constructor (private router: Router) {
    this.router.events.subscribe(val => {
      if(val instanceof ResolveEnd){
        let event = val as ResolveEnd;
        console.info(`${event.urlAfterRedirects}`);

        let title =TITLE[event.urlAfterRedirects];
        if(title==null){
          title=TITLE[''];
        }

        let titleTags= document.getElementsByTagName('title');
        titleTags[0].innerText=title;
      }
    })
}

  ngOnInit(): void {
    this.defineWindowSize();
  }



  
  // ==================================================================================================================
  // EVENTS
  // ==================================================================================================================
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
