import { Component, OnInit } from '@angular/core';
import { SourceCodeService } from 'inugami-components/service';

@Component({
  templateUrl: './switzerland.page.html',
  styleUrls: ['./switzerland.page.scss']
})
export class SwitzerlandPage implements OnInit {

  //==================================================================================================================
  // ATTRIBUTES
  //==================================================================================================================
  sourceCodes: any | undefined = undefined;

  //==================================================================================================================
  // INIT
  //==================================================================================================================
  constructor(private sourceCodeService: SourceCodeService) { }

  ngOnInit(): void {
    this.sourceCodeService.loadSourceCodeFromXML('data/source/switzerland.source.xml')
      .subscribe({
        next: res => this.sourceCodes = res
      });
  }


}
