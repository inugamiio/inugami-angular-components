import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InuSwitzerlandModel, InuSwitzerlandStyleGenerator } from 'inugami-components/models';
import { SourceCodeService } from 'inugami-components/service';
import { SVG_COLOR } from 'inugami-components/utils';

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
  styleGenerator : InuSwitzerlandStyleGenerator= (data)=>{
    if(!data.value){
      return undefined;
    }
    return SVG_COLOR.blue(Number(data.value), 0, 20);
  }

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
        [
          {
            canton: 'VD',
            selected: true,
            value: 1
          },
          {
            canton: 'FR',
            selected: true,
            value: 1
          },
          {
            canton: 'VS',
            selected: true,
            value: 1
          }
      ]
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
  onClicked(event:InuSwitzerlandModel<any>){
    if(event.value){
      const currentValue = Number(event.value);
      event.value = (currentValue+1) as any;
    }else{
      event.value = 0 as any;
    }
  }
  onSelected(event:any){
    this.selected = JSON.stringify(event);
  }

  onDeselected(event:any){
    this.deselected = JSON.stringify(event);
  }
  onChanged(event:any){
    this.change = undefined;
  }

}
