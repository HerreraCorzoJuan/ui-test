import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PeopleData } from 'src/app/model/card-data';
import { PeopleService } from 'src/app/services/PeopleData.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public dataCards: Observable<PeopleData[]>;
  public toggleSection: boolean = true;
  

  constructor(private dataService: PeopleService) { 
  }

  public ngOnInit(): void {
    this.dataCards = this.dataService.data;
  }
  public isThumbUpVote(vote: boolean,id: number){
    console.log('#response',vote,id);
    this.dataService.setData(vote,id);

  }

}
