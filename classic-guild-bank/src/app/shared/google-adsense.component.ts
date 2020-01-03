import { Component, OnInit, AfterViewInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'google-adsense',
  templateUrl: './google-adsense.component.html',
  styleUrls: ['./google-adsense.component.css']
})
export class GoogleAdsenseComponent implements OnInit, AfterViewInit{

  public env = environment;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
    try {
      (window['adsbygoogle'] = window['adsbygoogle'] || []).push({});
    } catch(e){
      if( this.env.production ) 
        console.error("error");
    }
  }
}

