import { Component, OnInit } from '@angular/core';
import { CaractereService } from '../API/service/services/caractere/caractere.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private service: CaractereService) { }

  ngOnInit(): void {
    this.log()
  }

  async log(){
    // await (await this.service.getCaractereByTheme(2)).subscribe(r=>{
      // console.log(r,"r");
      
    // })
  }
}
