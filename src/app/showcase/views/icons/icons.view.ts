import { Component, OnInit } from '@angular/core';
import { SelectItemModel, TimeBucket } from 'inugamiio/models';
import { HttpClient } from '@angular/common/http';
import { SVG_ANIMATION } from 'src/app/inugami/utils/svg.utils';
import { ObjectUnsubscribedError, Observable, of } from 'rxjs';
//import { INU_ICON } from 'src/app/inugami/commons/components/icon/icons';

@Component({
  templateUrl: './icons.view.html',
  styleUrls: ['./icons.view.scss']
})
export class IconView {
  

  //icons : string[] = Object.keys(INU_ICON);

  /*
  getIcon(icon:string):string{
    return (INU_ICON as any)[icon];
  }
  */
}
