import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { INU_ICON } from 'inugami-components/icon';
import { MenuLink } from 'inugami-components/models';
import { TITLE } from './app.page.titles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, AfterViewChecked{
  // ==================================================================================================================
  // ATTRIBUTES
  // ==================================================================================================================
  title = 'inugami-angular-components';
  mainPageStyleClass : string = 'page';
  displayType : string = 'large';
  height : number = 1080;
  body:HTMLElement|undefined = undefined;
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
            label: 'Switzerland',
            link: 'svg/switzerland',
            icon : INU_ICON.timegraph,
          },
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
  constructor (private router: Router,
               private changeDetectorRef:ChangeDetectorRef ) {
    this.body =document.getElementsByTagName('body')[0];
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
  ngAfterViewChecked(): void {
    setTimeout(()=> {
      if(this.body){
        this.height = this.body.getBoundingClientRect().height;
      }
    });
    
  }


  ngAfterViewInit(): void {
    this.defineWindowSize();
    this.changeDetectorRef.detectChanges();
  }


  
  // ===================================================================================================================
  // EVENTS
  // ===================================================================================================================
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.defineWindowSize();
  }

  private defineWindowSize(){
     const width = window.innerWidth;
     
     
     if(this.body){
      this.height = this.body.getBoundingClientRect().height;
    }

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


  // ===================================================================================================================
  // EVENTS
  // ===================================================================================================================
  get styleHeight():string{
    return `height:${this.height}px`;
}
}
