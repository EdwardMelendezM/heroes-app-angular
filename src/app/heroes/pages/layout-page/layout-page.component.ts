import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label:"List", icon:'label', url:'list' },
    { label:"Add", icon:'add', url:'new-heroe' },
    { label:"Search", icon:'search', url:'search' },
  ]
}
