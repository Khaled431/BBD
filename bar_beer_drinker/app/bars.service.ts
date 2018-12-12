import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Bar {
    name: string;
    city: string;
    phone_number: string;
}

@Injectable({
    providedIn: 'root'
})
export class BarsService {

    constructor(
        public http: HttpClient
    ) {
    }

    getBars(): Bar[] {
        return this.http.get<Bar[]>('/api/bar');
    }
}
