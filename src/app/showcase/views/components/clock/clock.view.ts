import { Component, OnInit } from '@angular/core';
import { SourceCodeService } from 'inugami-components/service';

@Component({
  templateUrl: './clock.view.html',
  styleUrls: ['./clock.view.scss']
})
export class ClockView implements OnInit {
  //==================================================================================================================
  // ATTRIBUTES
  //==================================================================================================================
  sourceCodes:any|undefined = undefined;
  
  //==================================================================================================================
  // INIT
  //==================================================================================================================
  constructor(private sourceCodeService: SourceCodeService) { }

  ngOnInit(): void {
    this.sourceCodeService.loadSourceCodeFromXML('data/source/clock.source.xml')
    .subscribe({
      next : res => this.sourceCodes = res
    });
  }


}
