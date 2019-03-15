import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public song: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onPause() {
    document.getElementsByClassName('playing')[0].removeAttribute('style');
    alert();
  }

}
