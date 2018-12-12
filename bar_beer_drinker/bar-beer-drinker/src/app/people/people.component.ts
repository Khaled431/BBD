import {Component, OnInit} from '@angular/core';
import {People, PeopleService} from "../people.service";
import {HttpResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

declare const Highcharts: any;

@Component({
  selector: 'app/people/',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  person: People;
  first: string;
  last: string;

  constructor(private peopleService: PeopleService, private route: ActivatedRoute) {
    route.paramMap.subscribe((paramMap) => {
      const split = paramMap.get("name").split("-");

      this.first = split[0];
      this.last = split[1];

      peopleService.getPerson(this.first, this.last).subscribe(data => {
          this.person = data;
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Person not found');
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occurred on the server. Please check the browser console.');
          }
        }
      );
    });
  }

  ngOnInit() {
  }

}
