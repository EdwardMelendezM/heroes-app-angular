import {Component, OnInit} from '@angular/core';
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {Hero} from "../../interfaces/heroes.interface";

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent implements OnInit
{
    public hero?: Hero
  constructor(
      private heroesService:HeroesService,
      private activatedRoute: ActivatedRoute,
      private route:Router
  ) {
  }
  ngOnInit():void{
    this.activatedRoute.params
        .pipe(
            switchMap(({id})=> this.heroesService.getHeroById(id))
        )
        .subscribe( hero=>{
            if(!hero){
                return this.route.navigate(["/heroes/list"])
            }
            this.hero=hero
            return
        })
  }

}
