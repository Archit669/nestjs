import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
    
    constructor(private readonly powerService: PowerService){

    }

    compute(a:number, b:number){
        console.log(`10 watt power is withdrwa by cpu compute`)
        this.powerService.supplyPower(10);
        return a+b;
    }
}
