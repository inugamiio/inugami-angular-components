import { Component, OnInit } from '@angular/core';
import { SourceCodeService } from 'inugami-components/service';

@Component({
  templateUrl: './code.view.html',
  styleUrls: ['./code.view.scss']
})
export class CodeView implements OnInit {
  //==================================================================================================================
  // ATTRIBUTES
  //==================================================================================================================
  sourceCodes:any|undefined = undefined;
  xmlFile : string = `
  <xml>
    <!--**********************************
    * Examples
    ***********************************-->
    <src name="defaultExample">
<![CDATA[
<inu-code *ngIf="sourceCodes"
          title="Default example"
          languages="xml"
          [source]="sourceCodes['defaultExample']">
</inu-code>
]]>
    </src>

    
</xml>
`;

  //==================================================================================================================
  // INIT
  //==================================================================================================================
  constructor(private sourceCodeService: SourceCodeService) { }

  ngOnInit(): void {
    this.sourceCodeService.loadSourceCodeFromXML('data/source/code.source.xml')
    .subscribe({
      next : res => this.sourceCodes = res
    });
  }


}
