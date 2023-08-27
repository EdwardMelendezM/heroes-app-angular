import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Hero, Publisher} from "../../interfaces/heroes.interface";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, switchMap} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements  OnInit{

  public heroForm = new FormGroup({
    id: new FormControl('',{ nonNullable:true }),
    superhero: new FormControl(''),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_go: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public publishers:any=[
    {
      id:'DC Comics',
      desc: 'DC - Comic'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comic'
    }
  ]

  constructor(
    private heroesServices:HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    if(!this.router.url.includes('edit')) return ;
    this.activatedRoute.params
      .pipe(
        switchMap(({id})=> this.heroesServices.getHeroById(id))
      )
      .subscribe(hero=>{
        if(!hero) return this.router.navigateByUrl('/')
        this.heroForm.reset(hero)
        return
      })
  }

  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;
    return hero
  }

  onSubmit():void{
    console.log("Entro")
    if(this.heroForm.invalid) return ;
    /*  this.heroesServices.updateHero(this.heroForm.value);*/
    if(this.currentHero.id){
      this.heroesServices.updateHero(this.currentHero)
        .subscribe(hero=>{
          this.showSnackbar(`${hero.superhero} updated!`)
        })
      return;
    }

    this.heroesServices.addHero(this.currentHero)
      .subscribe(hero=>{
        this.showSnackbar(`${hero.superhero} Created!`)
        this.router.navigate(['/heroes/edit',hero.id])
        return
      })
  }

  onDeleteHero(){
    if(!this.currentHero.id) throw Error('Hero is required')
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      // data: { name: 'austin' },
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result:boolean)=>result),
        switchMap(()=>this.heroesServices.deleteHero(this.currentHero)),
        filter((wasDeleted:boolean)=>wasDeleted),
      )
      .subscribe(()=>{
        this.router.navigate(['/heroes'])
          .then()
      })

    // dialogRef.afterOpened().subscribe(()=>{
    //     console.log("Abrioo")
    // })
  }

  showSnackbar(message:string):void{
    this.snackbar.open(message,'done',{ duration:2500 })
  }

}
