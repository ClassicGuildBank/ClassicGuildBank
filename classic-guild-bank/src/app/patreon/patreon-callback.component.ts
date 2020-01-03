import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { PatreonService } from './patreon.service';

@Component({
  selector: 'app-patreon-callback',
  templateUrl: './patreon-callback.component.html',
  styleUrls: ['./patreon-callback.component.css']
})
export class PatreonCallbackComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private patreonService: PatreonService) { }

  ngOnInit() {
    this.route.queryParamMap.pipe(
      switchMap(params => {
        const code = params.get('code');
        return this.patreonService.callback(code);
      })
    ).subscribe({
      next: id => {
        if ( !id ){
          //this.errorService.showError('Failed to link Patreon Account').afterClosed().pipe(take(1)).subscribe(x => this.router.navigate(['/guild']))          
        } else {
          
        }
      }
    });
      
  }

}
