import { Component, OnInit } from '@angular/core';
import { SelectItemModel, TimeBucket } from 'src/app/commons/models/select-item.model';
import { HttpClient } from '@angular/common/http';
import { SVG_ANIMATION } from 'src/app/commons/utils/svg.utils';
import { Observable, of } from 'rxjs';

@Component({
  templateUrl: './timeline.page.html',
  styleUrls: ['./timeline.page.scss']
})
export class TimelinePage implements OnInit {
  private strData: string | null = null;

  public data: TimeBucket<number>[] | null = [];
  public loader: ((from: Date, until: Date, resolution: number) => Observable<TimeBucket<number>[]>) | null = null;
  public from: Date = new Date(Date.parse("2023-12-20T09:44:00"));
  public until: Date = new Date(Date.parse("2024-01-20T09:44:00"));
  public timer: any = {
    linear: SVG_ANIMATION.TYPES.easeInCubic,
    parabolic: SVG_ANIMATION.TYPES.parabolic,
    easeOutCubic: SVG_ANIMATION.TYPES.easeOutCubic,
    easeInCubic: SVG_ANIMATION.TYPES.easeInCubic,
    easeInQuad: SVG_ANIMATION.TYPES.easeInQuad,
    easeOutQuad: SVG_ANIMATION.TYPES.easeOutQuad
  };

  public animeValue: number = 0;

  /**************************************************************************
  * CONSTRUCTORS
  **************************************************************************/
  constructor(private http: HttpClient) {
    this.loader = (from, until, resolution) => this.load(from, until, resolution);
  }


  /**************************************************************************
  * INITIALIZE
  **************************************************************************/
  ngOnInit() {
    let json = localStorage.getItem("timeline.data");
    if (json) {
      this.initializeData(JSON.parse(json));
    } else {
      this.http.get<TimeBucket<number>[]>("data/timeline.data.json").subscribe({
        next: res => {
          this.initializeData(res)
        }
      });
    }
  }


  private initializeData(res: TimeBucket<number>[]) {
    this.data = [];
    localStorage.setItem("timeline.data", JSON.stringify(res));
    for (let item of res) {
      if (typeof item.time == "string") {
        const date = new Date(Date.parse(item.time));
        item.time = date;
      }
      this.data.push(item);
    }
  }



  play(): void {
    SVG_ANIMATION.animate(this.processAnimation, { duration: 1000, timer: SVG_ANIMATION.TYPES.easeOutCubic });
  }

  private processAnimation(time: number): void {
    console.log(`t : ${time}`);
  }


  /**************************************************************************
  * loadData
  **************************************************************************/
  load(from: Date, until: Date, resolution: number): Observable<TimeBucket<number>[]> {
    const result = [];
    const delta = until.getTime() - from.getTime();
    const steps = delta / resolution;

    const d = from.getTime() + (steps * resolution);

    console.log(`${d} - ${new Date(d)} | ${resolution}`)
    let timeCursor = from;
    let nextStep = timeCursor.getTime() + steps;
    let buffer: any = {};

    if (this.data) {
      for (let item of this.data) {

        if (item.time.getTime() >= from.getTime() && item.time.getTime() <= until.getTime()) {
          const cursorNow = item.time.getTime();


          if (cursorNow >= nextStep) {
            const items: SelectItemModel<number>[] = [];
            const keys = Object.keys(buffer);
            for (let key of keys) {
              items.push({
                type: key,
                value: buffer[key]
              });
            }

            result.push({
              time: timeCursor,
              items: items
            });
            buffer = {};
            timeCursor = item.time;
            nextStep = timeCursor.getTime() + steps;
          }

          if (item.items) {
            for (let currentItem of item.items) {
              if (currentItem.value) {
                let value: number | null = null;
                if (currentItem.type) {
                  value = buffer[currentItem.type];
                  buffer[currentItem.type] = value ? value + currentItem.value : currentItem.value;
                }

              }
            }
          }
        }
      }
    }

    const items: SelectItemModel<number>[] = [];
    const keys = Object.keys(buffer);
    for (let key of keys) {
      items.push({
        type: key,
        value: buffer[key]
      });
    }

    result.push({
      time: timeCursor,
      items: items
    });

    return of(result);
  }
}
