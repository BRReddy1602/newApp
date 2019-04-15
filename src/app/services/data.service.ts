import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    public selectedApp: object = {};
    public user: any = { selectedRole: 'Art' };
    departments: any;
    render: any;
    sections: any;
    courses: any;
    exams: any;
    subjects: any;
    studentsId: any;
    private serviceURL = 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole';
    private commonUrl = 'http://13.127.118.40:8080/collage-management/collage/';
    constructor(private http: HttpClient, public router: Router, public snackBar: MatSnackBar) {
    }
   
    getUser(app): Observable<any> {
        return this.http.get<any>(this.serviceURL);
    }
 
    deleteData(url): Observable<any> {
        return this.http.delete(this.commonUrl + url);
    }

    getData(url, data): Observable<any> {
        return this.http.post<any>(this.commonUrl + url, data);
        // return this.http.get<any[]>(url);
    }

    addDetail(newRecord, url): Observable<any[]> {
        return this.http.get<any[]>(url);
    }

    getRequest(url): Observable<any> {
        return this.http.get<any>(this.commonUrl + url);
    }

    getObjectBy(data, filter) {
        var _return: any;
        for (var i = 0; i < data.length; i++) {
            if (data.hasOwnProperty(i) && this._searchObject(data[i], filter)) {
                _return = data[i];
            }
        }
        return _return ? _return : undefined;
    }

    _searchObject(obj, filter) {
        var found = false;
        var key = Object.keys(filter)
        if (obj[key[0]] == filter[key[0]])
            found = true;
        else
            found = false;
        return found;
    }

    getObjectsBy(data, filter) {
        var arrResult = [];
        for (var i = 0; i < data.length; i++) {
            if (data.hasOwnProperty(i) && this._searchObject(data[i], filter)) {
                arrResult.push(data[i]);
            }
        }
        return arrResult;
    }

    convertDate(date, out) {
        if (date) {
            if (out) {
                return date.valueOf();
            }
            else {
                let d = new Date(date);
                let month = String(d.getMonth() + 1);
                let day = String(d.getDate());
                const year = String(d.getFullYear());

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return `${day}/${month}/${year}`;
            }
        }
        else {
            return '';
        }
    }

}

