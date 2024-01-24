import { animate, state, style, transition, trigger } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ])

  ]
})
export class LayoutComponent implements  OnInit,AfterViewInit,OnDestroy {

  isMenuOpen = true;
  contentMargin = 240;
  @ViewChild('sidenav')sidenav!: MatSidenav;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event:any){
    this.pageYoffset = window.pageYOffset;
  }

  constructor(private scroll: ViewportScroller,private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private observer: BreakpointObserver) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
   this.mobileQuery.addListener(this._mobileQueryListener);
  }


 ngOnInit(): void {



  }

  scrollToTop(){

    this.scroll.scrollToPosition([0,0]);
    }

    ngAfterViewInit() {


      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
          // Manually trigger change detection after modifying the sidenav properties
          this.changeDetectorRef.detectChanges();
    }
    onToolbarMenuToggle() {

      this.isMenuOpen = !this.isMenuOpen;

      if(!this.isMenuOpen) {
        this.contentMargin = 0 ;


      } else {
        this.contentMargin = 240;



      }
    }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
