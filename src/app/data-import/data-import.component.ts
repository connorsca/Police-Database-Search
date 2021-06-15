import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoliceApiData } from './data.model';

@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css'],
})
export class DataImportComponent implements OnInit {
  policeApiData: PoliceApiData[] = [];
  policeData = {};
  searchLocation = '';
  searchLocationString = '';
  addressData = {};
  latitude = '';
  longitude = '';
  locationShow = false;
  dataShow = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {}
  /*
  Location API call
  */
  async onSetLocation() {
    console.log('Running address API');
    // Postcodes API call try with error catching
    try {
      this.addressData = await this.http
        .get('https://api.postcodes.io/postcodes/' + this.searchLocation)
        .toPromise();
      this.locationShow = true;
      this.latitude = this.addressData['result']['latitude'];
      this.longitude = this.addressData['result']['longitude'];
      // Create location string from returned API data
      this.searchLocationString =
        this.addressData['result']['admin_ward'] +
        ', ' +
        this.addressData['result']['admin_district'] +
        ', ' +
        this.addressData['result']['country'] +
        ', ' +
        this.addressData['result']['postcode'];
    } catch (e) {
      alert(
        'Something went wrong! \r\n\r\nPlease check your imputed postcode and try again'
      );
    }
  }
  /*
  Police API
  */
  async onPoliceApiCall() {
    console.log('Running police API');
    // Police API call try with error catching
    try {
      this.policeData = await this.http
        .get(
          'https://data.police.uk/api/crimes-street/all-crime?' +
            'lat=' +
            this.latitude +
            '&lng=' +
            this.longitude
        )
        .toPromise();
      this.dataShow = true;
      console.log('Police API returned data:');
      console.dir(this.policeData);
      // loop throught returned API object to create temp object then add to array
      for (var key in this.policeData) {
        // If statement to catch missing obejct value that stops object creation
        if (this.policeData[key].outcome_status === null) {
          var category = 'No Info';
        } else {
          category = this.policeData[key].outcome_status.category;
        }
        var tempObj = new PoliceApiData(
          this.policeData[key].category,
          this.policeData[key].location.street.name,
          category,
          this.policeData[key].month
        );
        this.policeApiData.push(tempObj);
      }
    } catch (e) {
      alert('Something went wrong! \r\n\r\nPlease try again');
    }
  }
  /*
  Restart all values in form
  */
  restartSearch() {
    this.searchLocation = '';
    this.searchLocationString = '';
    this.addressData = {};
    this.latitude = '';
    this.longitude = '';
    this.locationShow = false;
    this.dataShow = false;
    this.policeApiData = [];
    this.policeData = {};
  }
}
