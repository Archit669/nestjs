import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Controller()
export class ComputerController {
    constructor(
        private readonly cpuService:CpuService, 
        private readonly diskService:DiskService
    ){}

    @Get()
    run(){
        return [
            this.cpuService.compute(10,20),
            this.diskService.getData()

        ]
    }
}
