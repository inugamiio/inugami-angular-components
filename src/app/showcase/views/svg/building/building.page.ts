import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SourceCodeService } from 'inugami-components/service';
import { BuildingModelDTO } from 'inugami-components/svg-building';

@Component({
  templateUrl: './building.page.html',
  styleUrls: ['./building.page.scss']
})
export class BuildingPage implements OnInit {

  //==================================================================================================================
  // ATTRIBUTES
  //==================================================================================================================
  form :FormGroup|undefined = undefined;

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
    const data : BuildingModelDTO[] = [

    ];

    this.form = this.formBuilder.group({
      building: [data]
    });
  }

  

  //====================================================================================================================
  // EVENTS
  //====================================================================================================================
  

}
