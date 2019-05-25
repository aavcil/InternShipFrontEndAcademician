import { Days } from './Days';
import { Company } from './Company';

export class Students{
    id:number;
    name:string;
    surname:string;
    companyId:number;
    tcNo:number;
    Day:Days[];
    Companies:Company;
}