import { Component, OnInit } from '@angular/core';
import { BreakingNews, BreakingNewsLevel, ObservableSubscriber } from 'inugami-components/models';
import { SourceCodeService } from 'inugami-components/service';

@Component({
  templateUrl: './breaking-news.view.html',
  styleUrls: ['./breaking-news.view.scss']
})
export class BreakingNewsView implements OnInit {
  //==================================================================================================================
  // ATTRIBUTES
  //==================================================================================================================
  sourceCodes:any|undefined = undefined;
  observableSubscriber : ObservableSubscriber<BreakingNews[]> = new  ObservableSubscriber<BreakingNews[]>();
  //==================================================================================================================
  // INIT
  //==================================================================================================================
  constructor(private sourceCodeService: SourceCodeService) { }

  ngOnInit(): void {
    this.sourceCodeService.loadSourceCodeFromXML('data/source/breaking-news.xml')
    .subscribe({
      next : res => this.sourceCodes = res
    });
  }

  //==================================================================================================================
  // ACTIONS
  //==================================================================================================================
  addNewsInfo(){
    if(this.observableSubscriber.subscriber){
      const events : BreakingNews[] = [];
      events.push({
        uid:'2edd417e-994a-4549-ad5d-f863cea43720',
        level: BreakingNewsLevel.INFO,
        date : new Date(),
        title: 'Lorem ipsum dolor sit amet',
        message : 'Ut quis erat fermentum, molestie quam at, tincidunt nisl'
      });
      this.observableSubscriber.subscriber.next(events);
    }
  }
  addNewsWarn(){
    if(this.observableSubscriber.subscriber){
      const events : BreakingNews[] = [];
      events.push({
        uid:'0a9d2080-6fac-4c02-b827-f2c27a2c5ff2',
        level: BreakingNewsLevel.WARN,
        date : new Date(),
        title: 'Nulla in lorem tincidunt neque dapibus consectetur',
        message : 'Sed quis metus efficitur, eleifend nulla ut, tempor ante'
      });
      this.observableSubscriber.subscriber.next(events);
    }
  }

  addNewsError(){
    if(this.observableSubscriber.subscriber){
      const events : BreakingNews[] = [];
      events.push({
        uid:'6a136ed3-f2b2-4dbd-873f-502a07615e00',
        level: BreakingNewsLevel.ERROR,
        date : new Date(),
        title: 'Aenean sit amet ante ut nisi ornare egestas',
        message : ' Nullam ullamcorper, ligula vel suscipit aliquet, nunc nisi malesuada elit, sed ullamcorper justo nisl at metus'
      });
      this.observableSubscriber.subscriber.next(events);
    }
  }

  addNewsFatal(){
    if(this.observableSubscriber.subscriber){
      const events : BreakingNews[] = [];
      events.push({
        uid: 'c04478a5-d6f7-4277-a18c-f47c67953ee7',
        level: BreakingNewsLevel.FATAL,
        date : new Date(),
        title: 'Cras aliquet dapibus tortor, eu venenatis leo',
        message : 'Quisque sed neque nec ipsum varius vestibulum. Nunc pulvinar felis arcu'
      });
      this.observableSubscriber.subscriber.next(events);
    }
  }

  addNews(){
    if(this.observableSubscriber.subscriber){
      const events : BreakingNews[] = [];
      events.push({
        level: BreakingNewsLevel.INFO,
        date : new Date(),
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        message : 'Sed nibh enim, faucibus a mi in, pellentesque bibendum ante. Cras rutrum placerat sem, et viverra justo placerat in'
      });
      this.observableSubscriber.subscriber.next(events);
    }
  }

}
