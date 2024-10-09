import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {

    constructor(private readonly powerService:PowerService){}

    getData(){
        console.log(`${20} watts of power is supplied to disk`);
        this.powerService.supplyPower(20);
        console.log("data is fetching from disk");
        return "data"
    }
}
