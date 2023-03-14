import { Injectable } from '@nestjs/common';
import { DBCrudService } from 'src/modules/dbcrud/dbcrud.service';

@Injectable()
export class CustomersService {
    constructor(
        private readonly dBConfigService: DBCrudService
    ) {}

    async getAllCustomers(): Promise<any> {
        return await this.dBConfigService.findAll('customers');
    }
    async getUsersByCustomer(id: number): Promise<any> {
        const collRefOpt = {
            collection: 'customers',
            document: id,
            field: 'custId'
        }
        return await this.dBConfigService.findAll('users', {}, collRefOpt);
    }
    async getDevicesByCustomer(id: number): Promise<any> {
        const collRefOpt = {
            collection: 'customers',
            document: id,
            field: 'custId'
        }
        return await this.dBConfigService.findAll('devices', {}, collRefOpt);
    }
    async getCustomerById(id: number): Promise<any> {
        return await this.dBConfigService.findItem('customers', id);
    }
}