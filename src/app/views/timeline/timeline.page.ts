import { Component, Inject, OnInit } from '@angular/core';
import { SelectItemModel, TimeBucket } from 'src/app/commons/models/select-item.model';
import { TimelineLoader } from 'src/app/components/timeline/timeline.model';
import {HttpClient} from '@angular/common/http';
import { SVG_CONST } from 'src/app/commons/utils/svg.utils';
import { Observer, of } from 'rxjs';

@Component({
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss']
})
export class TimelinePage implements OnInit {

  public data : TimeBucket<number>[]= [];
  public strData : string|null= null;
  /**************************************************************************
  * CONSTRUCTORS
  **************************************************************************/
  constructor(private http: HttpClient) {

    

   }


  /**************************************************************************
  * INITIALIZE
  **************************************************************************/
  ngOnInit() {
    
    
    this.http.get("data/timeline.data.json").subscribe({
      next : data=> {
        //this.data =data as TimeBucket<number>[]
        this.buildData();
      }
    });
   

    /*
    this.data =[
      {
        time: new Date(),
        items : [
          {
            value:1,
            type:"success"
          },
          {
            value:1,
            type:"error"
          }
        ]
      }
    ]
    */
  }


  private buildData(){
    console.log("generate data...")
    const now = new Date();
    const startDate = new Date( now.getTime() - (SVG_CONST.DATETIME_YEAR/6));
    const steps = (now.getTime()- startDate.getTime()) / (SVG_CONST.NB_MINUTES_PER_DAY);

    console.log(`${startDate} -> ${now}`);
    const result : TimeBucket<number>[]= [];

    const types = ["success", "error", "warning"];
    this.data =[];

    for(let i=0; i<steps; i++){
      const timeToAdd = i*SVG_CONST.MINUTE;
      const time= new Date( startDate.getTime() + timeToAdd);
      const items : SelectItemModel<number>[]=[];
      console.log(`${i} / ${steps}`);
      for(let type of types){
        if(Math.random()>0.5){
          let max = 10;
          if(type == "success"){
            max = 30;
          }

          let value = Math.floor(Math.random() * max);
          items.push({
            type:type,
            value: value<=1 ? 1 : value
          });


        }
      }

      this.data.push({
        time: time,
        items: items
      });
      
    }
   
    this.strData = JSON.stringify(this.data);
  }


  /**************************************************************************
  * loadData
  **************************************************************************/
   load(from: Date, until: Date, resolution: number): TimeBucket<number>[] {
    
    return [];
  }
}
