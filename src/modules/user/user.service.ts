import { Injectable } from '@nestjs/common';
import { DBCrudService } from 'src/modules/dbcrud/dbcrud.service';

@Injectable()
export class UserService {
    constructor(
        private readonly dBConfigService: DBCrudService
    ) {}

    async getAllUsers(): Promise<any> {
        return await this.dBConfigService.findAll('users');
    }
    async getUserById(id: number): Promise<any> {
        return await this.dBConfigService.findItem('users', id);
    }
}