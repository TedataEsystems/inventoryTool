import {AfterViewInit, Component,OnInit } from '@angular/core';
import { LoaderService } from './shared/service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{
  title = '';

constructor(private loader: LoaderService){
    this.loader.busy();
}
ngOnInit(): void {

}
  ngAfterViewInit() {
    this.loader.idle();
  }
}


