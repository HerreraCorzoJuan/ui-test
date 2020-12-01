import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {
  @Input() public thumbsUp: number;
  @Input() public thumbsDown: number;
  @Input() public cardTitle: string;
  @Input() public cardInfo: string;
  @Input() public cardDescription: string;
  @Input() public urlImage: string;
  @Input() public voteAgain: boolean = false;
  @Input() public id: number;
  @Output() public emitThumbsUp: EventEmitter<boolean> = new EventEmitter();
  public thumbsUpPercentage: number;
  public thumbsDownPercentage: number;
  public thumbsUpClicked: boolean = true;
  public thumbsDownClicked: boolean = false;

  constructor() { }
  public ngOnChanges(changes: SimpleChanges): void {
   if(changes.thumbsUp || changes.thumbsDown){
    this.thumbsUpPercentage = (this.thumbsUp)/(this.thumbsDown + this.thumbsUp);
    this.thumbsDownPercentage = (this.thumbsDown)/(this.thumbsDown + this.thumbsUp);
   }
  }

  
  
  public ngOnInit(): void {
    this.thumbsUpPercentage = (this.thumbsUp)/(this.thumbsDown + this.thumbsUp);
    this.thumbsDownPercentage = (this.thumbsDown)/(this.thumbsDown + this.thumbsUp);
  }
  public setStateClick(event){
    const elementClass: string = event.srcElement && event.srcElement.className ? event.srcElement.className : '';
    if(elementClass.includes('thumbs-up')){
      this.thumbsDownClicked=false;
      this.thumbsUpClicked=true;
    } else if (elementClass.includes('thumbs-down')){
      this.thumbsDownClicked=true;
      this.thumbsUpClicked=false;
    };
  }
  public submitVote(){
    this.emitThumbsUp.next(this.thumbsUpClicked);
  }

}
