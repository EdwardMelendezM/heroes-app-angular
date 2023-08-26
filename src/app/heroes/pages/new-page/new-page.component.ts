import { Component } from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent {

  public publishers:any=[
    {
      id:'DC Commics',
      desc: 'DC - Commic'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comic'
    }
  ]
}
