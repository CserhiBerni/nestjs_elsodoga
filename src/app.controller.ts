import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ReservationDto } from './reservation.dto';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('reservation')
  @Render('reservation')
  getReservation() {
    return { errors: [] };
  }

  @Post('reservation')
  postReservation(@Body() reservationDto: ReservationDto, @Res() response: Response) {
    const nev = reservationDto.nev;
    const email = reservationDto.email;
    const datum = reservationDto.datum;
    const nezok = Number(reservationDto.nezok);

    const errors = [];

    let emailArr = email.split("@")
    if (emailArr[0].length < 1 || emailArr[1].length < 1) {
      errors.push("Email cím nem megfelelő hosszúságú")
    }
    
    let datumArr = datum.split("-")
    const currentDate = new Date()
    if(Number(datumArr[0]) < currentDate.getFullYear() ) {
      
    }
  }
}
