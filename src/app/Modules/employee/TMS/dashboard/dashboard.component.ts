import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TMS } from 'src/app/Services/TMS.service';
import Swal from 'sweetalert2';
import * as ApexCharts from 'apexcharts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  loader: any;
  accpetList: any;
  rejectList: any;
  newTicketList: any;
  closedData: any;
  departmentData: any;
  cityData: any;
  cityDataCopy: any;
  startDate: any;
  endDate: any;
  date: any;
  accpetListCopy: any;
  closedDataCopy: any;
  rejectListCopy: any;
  newTicketListCopy: any;
  messageId: any;
  showPopup: any;

  constructor(public TMS: TMS, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.GetTicketsData();
    this.getClosedTicket();
    this.GetNewTicketsData();
    this.GetRejectData();
    this.getCity();
    this.getDepartment();
    this.getbarchart();
    this.getbarchart1();
    this.getbarchartfordepartment();
  }

  public getbarchart1() {
    this.TMS.GetTickets().subscribe((res) => {
      debugger;
      let temp: any = res;
      var options = {
        series: [
          {
            name: 'Status',
            data: [
              temp[0].openticket,
              temp[0].acceptedticket,
              temp[0].rejectedticket,
              temp[0].closedticket,
            ],
          },
        ],
        chart: {
          height: 220,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: '30%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
        },

        grid: {
          row: {
            colors: ['#fff', '#f2f2f2'],
          },
        },
        xaxis: {
          labels: {
            rotate: -45,
          },
          categories: ['Open', 'Accepted', 'Rejected', 'Closed'],
          tickPlacement: 'on',
        },
        yaxis: {
          title: {
            text: 'Tickets',
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 0.85,
            opacityTo: 0.85,
            stops: [50, 0, 100],
          },
        },
      };

      var chart = new ApexCharts(document.querySelector('#chart'), options);
      chart.render();
    });
  }

  public getbarchart() {
    this.TMS.GetTickets().subscribe((res) => {
      debugger;
      let temp: any = res;
      const donutChartOptions1 = {
        chart: {
          type: 'pie',
          height: 280,
          width: 280,
        },
        series: [
          temp[0].openticket,
          temp[0].acceptedticket,
          temp[0].rejectedticket,
          temp[0].closedticket,
        ],
        labels: [
          'New Ticket',
          'Accepted Tickets',
          'Reject Tickets',
          'Closed Tickets',
        ],
        // labels: ['Category 1', 'Category 2'],
        // Customize colors in the colors array

        // Customize width of the donut chart's segments
        plotOptions: {
          pie: {
            dataLabels: {
              offset: 20,
            },
          },
        },

        dataLabels: {
          style: {
            colors: ['black'],
          },
        },

        legend: {
          show: true,
          position: 'bottom',
          verticalAlign: 'bottom',
          align: 'center',
        },
        colors: ['#FF0000', '#008000', '#FFFF00', '#ADD8E6'],
      };

      var chart1 = new ApexCharts(
        document.querySelector('#chart1'),
        donutChartOptions1
      );
      chart1.render();
    });
  }
  public getbarchartfordepartment() {
    this.TMS.GetTickets().subscribe((res) => {
      debugger;
      let temp: any = res;
      const donutChartOptions2 = {
        chart: {
          type: 'pie',
          height: 280,
          width: 280,
        },
        series: [
          temp[0].electricity,
          temp[0].sewage,
          temp[0].water,
          temp[0].health,
          temp[0].publicWorks,
          temp[0].cleaning,
        ],
        labels: [
          'Electricity',
          'Sewage',
          'Water',
          'Health',
          'Public Works',
          'Cleaning',
        ],
        // labels: ['Category 1', 'Category 2'],
        // Customize colors in the colors array

        // Customize width of the donut chart's segments
        plotOptions: {
          pie: {
            dataLabels: {
              offset: 20,
            },
          },
        },

        dataLabels: {
          style: {
            colors: ['black'],
          },
        },

        legend: {
          show: true,
          position: 'bottom',
          verticalAlign: 'bottom',
          align: 'center',
        },
        colors: ['#FF0000', '#008000'],
      };

      var chart2 = new ApexCharts(
        document.querySelector('#chart2'),
        donutChartOptions2
      );
      chart2.render();
    });
  }
  public GetTicketsData() {
    this.TMS.GetAcceptedTickets().subscribe((res) => {
      debugger;
      this.accpetList = res;
      this.accpetListCopy = res;
      this.loader = false;
    });
  }
  public getClosedTicket() {
    this.TMS.GetClosedTickets().subscribe((res) => {
      debugger;
      this.closedData = res;
      this.closedDataCopy = res;
      this.loader = false;
    });
  }
  public GetNewTicketsData() {
    this.TMS.GetTickets().subscribe((res) => {
      debugger;
      this.newTicketList = res.filter((x) => x.statusID == 5);
      this.newTicketListCopy = res.filter((x) => x.statusID == 5);
      this.loader = false;
    });
  }
  public GetRejectData() {
    this.TMS.GetRejectedTickets().subscribe((res) => {
      debugger;
      this.rejectList = res;
      this.rejectListCopy = res;
      this.loader = false;
    });
  }
  public getDepartment() {
    this.TMS.GetDepartment().subscribe((res) => {
      debugger;
      this.departmentData = res;
      this.loader = false;
    });
  }
  public filteredDepartment(event: any) {
    debugger;
    let filteredData = event.target.value;
    if (event.target.value == 'all') {
      this.GetTicketsData();
      this.getClosedTicket();
      this.GetNewTicketsData();
      this.GetRejectData();
    }
    if (filteredData != '') {
      this.closedData = this.closedDataCopy.filter(
        (x: { department: any }) => x.department == filteredData
      );
      this.accpetList = this.accpetListCopy.filter(
        (x: { department: any }) => x.department == filteredData
      );
      this.rejectList = this.rejectListCopy.filter(
        (x: { department: any }) => x.department == filteredData
      );
      this.newTicketList = this.newTicketListCopy.filter(
        (x: { department: any }) => x.department == filteredData
      );
      this.getbarchartfordepartment();
      this.getbarchart();
    }
  }
  public getCity() {
    this.TMS.GetCity().subscribe((res) => {
      debugger;
      this.cityData = res;
      this.loader = false;
    });
  }
  public filteredCity(event: any) {
    debugger;
    let filteredData = event.target.value;
    if (event.target.value == 'all') {
      this.GetTicketsData();
      this.getClosedTicket();
      this.GetNewTicketsData();
      this.GetRejectData();
    }
    if (filteredData != '') {
      this.closedData = this.closedDataCopy.filter(
        (x: { cityID: any }) => x.cityID == filteredData
      );
      this.rejectList = this.rejectListCopy.filter(
        (x: { cityID: any }) => x.cityID == filteredData
      );
      this.accpetList = this.accpetListCopy.filter(
        (x: { cityID: any }) => x.cityID == filteredData
      );
      this.newTicketList = this.newTicketListCopy.filter(
        (x: { cityID: any }) => x.cityID == filteredData
      );
      this.getbarchartfordepartment();
      this.getbarchart();
    }
  }
  public getEndDate(event: any) {
    debugger;
    this.startDate = this.datePipe.transform(event[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(event[1], 'yyyy-MM-dd');
    if (this.endDate < this.startDate) {
      Swal.fire('The end date should be greater than the start date');
      this.endDate = '';
    } else if (this.startDate == undefined) {
      Swal.fire('Please select the start date first');
      this.endDate = '';
    } else {
      this.TMS.GetTicketsbydate(this.startDate, this.endDate).subscribe(
        (res) => {
          debugger;
          this.newTicketList = res.filter((x) => x.statusID == 5);
          this.loader = false;
        }
      );
      this.TMS.GetAcceptedTicketsByDate(this.startDate, this.endDate).subscribe(
        (res) => {
          debugger;
          this.accpetList = res;
          this.loader = false;
        }
      );
      this.TMS.GetRejectedTicketsByDate(this.startDate, this.endDate).subscribe(
        (res) => {
          debugger;
          this.rejectList = res;
          this.loader = false;
        }
      );
      this.TMS.GetClosedTicketsByDate(this.startDate, this.endDate).subscribe(
        (res) => {
          debugger;
          this.closedData = res;
          this.loader = false;
        }
      );
      this.getbarchartfordepartment();
      this.getbarchart();
    }
  }
}
