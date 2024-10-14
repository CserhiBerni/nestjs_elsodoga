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
    return { errors: [], resData: { nev: "", email: "", datum: "", nezok: "" } };
  }

  @Post('reservation')
  postReservation(@Body() reservationDto: ReservationDto, @Res() response: Response) {
    const nev = reservationDto.nev;
    const email = reservationDto.email;
    const datum = Date.parse(reservationDto.datum);
    const nezok = Number(reservationDto.nezok);

    const errors = [];

    let emailArr = email.split("@")
    if (emailArr[0].length < 1 || emailArr[1].length < 1) {
      errors.push("Email cím nem megfelelő hosszúságú")
    }

    if (datum < Date.now()) {
      errors.push("A dátum nem lehet a múltban")
    }

    if (nezok > 10 || nezok < 1) {
      errors.push("Nem megfelelő nézőszám")
    }

    if (errors.length > 0) {
      const resData = { nev: nev, email: email, datum: reservationDto.datum, nezok: nezok }
      response.render('reservation', { errors: errors, resData: resData })
    }
    else {
      response.redirect('/success')
    }
  }

  @Get('success')
  @Render('success')
  getSuccess() {
    return;
  }
}

