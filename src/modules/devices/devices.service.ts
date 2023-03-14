import { Injectable } from '@nestjs/common';
import { DBCrudService } from 'src/modules/dbcrud/dbcrud.service';

@Injectable()
export class DevicesService {
    constructor(
        private readonly dBConfigService: DBCrudService
    ) {}

    async getAllDevices(): Promise<any> {
        return await this.dBConfigService.findAll('devices');
    }
    async getDeviceById(id: number): Promise<any> {
        return await this.dBConfigService.findItem('devices', id);
    }
}