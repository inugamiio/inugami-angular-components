import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  form !:FormGroup;
  selected : string|undefined = '';
  deselected : string|undefined = '';
  change : string|undefined = '';

  //==================================================================================================================
  // INIT
  //==================================================================================================================
  constructor(
    private changeDetectorRef:ChangeDetectorRef,
    private formBuilder:FormBuilder,
    private sourceCodeService: SourceCodeService,
    private ngZone: NgZone
    ) {
      
     }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cantons : [
        {
          canton: 'VD',
          selected: true
        },
        {
          canton: 'FR',
          selected: true
        },
        {
          canton: 'VS',
          selected: true
        }
      ]
    });

    this.sourceCodeService.loadSourceCodeFromXML('data/source/switzerland.source.xml')
      .subscribe({
        next: res => this.sourceCodes = res
      });
  }

  

  //====================================================================================================================
  // EVENTS
  //====================================================================================================================
  onSelected(event:any){
    this.selected = JSON.stringify(event);
  }

  onDeselected(event:any){
    this.deselected = JSON.stringify(event);
  }
  onChanged(event:any){
    this.change = JSON.stringify(event);
  }

}
