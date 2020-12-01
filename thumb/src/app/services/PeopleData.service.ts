import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { filter } from "rxjs/operators";
import { PeopleData } from '../model/card-data';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PeopleService {
    private dataPeople: PeopleData[] = [];
    public data: BehaviorSubject<PeopleData[]> = new BehaviorSubject<PeopleData[]>([]);
    
    constructor(private httpClient: HttpClient) { 
        const dataInLocalStorage=localStorage.getItem('DataPeople');
        if(!dataInLocalStorage){
            this.httpClient.get("./assets/data.json").pipe(filter((data: PeopleData[])=>!!data && data.length > 0)).subscribe((data) => {
                this.dataPeople = data;
                this.data.next(this.dataPeople);
            });

        }else{
            this.dataPeople = JSON.parse(dataInLocalStorage);
            this.data.next(this.dataPeople);
        }
        
    }

    public setData(vote: boolean, id: number) {
        this.dataPeople = this.dataPeople.map((member) => {
            if(member.id === id && vote){
                member.thumbUp += 1;
                member.voteAgain = true;
            } else if(member.id === id){
                member.thumbDown += 1;
            }
            return member;
        } );
        localStorage.setItem('DataPeople',JSON.stringify(this.dataPeople));
        this.data.next(this.dataPeople);
      }
}