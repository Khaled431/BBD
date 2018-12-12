import {Component, OnInit} from '@angular/core';
import {BeerMeta, BeersService} from '../beers.service';
import {ActivatedRoute} from '@angular/router';

import {SelectItem} from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

  beerName: string;

  beerLocations: BeerMeta[];
  manufacturer: string;

  filterOptions: SelectItem[];
  sortField: string;
  sortOrder: number;

  constructor(
    private beerService: BeersService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.beerName = paramMap.get('item_name');
      this.beerService.getBarsSelling(this.beerName).subscribe(
        data => {
          this.beerLocations = data;
        }
      );

      this.beerService.getBeerManufacturers(this.beerName)
        .subscribe(
          data => {
            this.manufacturer = data;
          }
        );

      this.filterOptions = [
        {
          'label': 'Bar Name',
          'value': 'bar_name'
        },
        {
          'label': 'Smallest Prices',
          'value': 'min_item_cost'
        },
        {
          'label': 'Largest Prices',
          'value': 'max_item_cost'
        },
        {
          'label': 'Most Transactions',
          'value': 'max_transactions'
        },
        {
          'label': 'Least Transactions',
          'value': 'min_transactions'
        }
      ];
    });
  }

  ngOnInit() {
  }

  sortBy(selectedOption: string) {
    if (selectedOption === 'bar_name') {
      this.beerLocations.sort((a, b) => {
        return a.bar.localeCompare(b.bar);
      });
    } else if (selectedOption === 'min_item_cost') {
      this.beerLocations.sort((a, b) => {
        return a.item_cost - b.item_cost;
      });
    } else if (selectedOption === 'max_item_cost') {
      this.beerLocations.sort((a, b) => {
        return b.item_cost - a.item_cost;
      });
    } else if (selectedOption === 'min_transactions') {
      this.beerLocations.sort((a, b) => {
        return a.num_transactions - b.num_transactions;
      });
    } else if (selectedOption === 'max_transactions') {
      this.beerLocations.sort((a, b) => {
        return b.num_transactions - a.num_transactions;
      });
    }
  }


}
