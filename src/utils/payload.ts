<<<<<<< HEAD
import now from './now'
export default function genPayload(data:any,error:any){

    
    return {
        status: !error?200:500,
        message: !error?'GET_SUECESS':'GET_FAIL',
        data: data,
        error: error,
        timestamp: now(),
      }
=======
import now from "./now";
import { HttpException, HttpStatus } from '@nestjs/common';

export default function genPayload(data: any, error: any =null, type: string = ACTIONTYPE.GET) {
    return    {
        status: getStatus(error, type),
        message: !error ? `${type}_SUECESS` : `${type}_FAIL`,
        data: data,
        error: error,
        timestamp: now(),
    }

}


const getStatus = (error: any, type: string) => {
    if (error) return HttpStatus.INTERNAL_SERVER_ERROR
    if (type == ACTIONTYPE.CREATE) return HttpStatus.CREATED
    return HttpStatus.OK
}


export enum ACTIONTYPE {
    GET = 'GET',
    CREATE = 'CREATE',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE'
}



export function stamp (tempDataObj: any, dto: any, type: string) {


    const user = dto?.request_by

    const timeNow = now()

    if (type == ACTIONTYPE.CREATE) {
        tempDataObj['create_by_id'] = user.id;
        tempDataObj['create_by'] = user.displayname;
        tempDataObj['create_date'] = timeNow;
        tempDataObj['is_active'] = true
    }

    else if (type == ACTIONTYPE.DELETE) {
        tempDataObj['delete_by_id'] = user.id;
        tempDataObj['delete_by'] = user.displayname;
        tempDataObj['delete_date'] = timeNow;

    }


    tempDataObj['update_by_id'] = user.id;
    tempDataObj['update_by'] = user.displayname;
    tempDataObj['update_date'] = timeNow;

    return tempDataObj

}




 

export class ForbiddenException extends HttpException {

    constructor() {

        super(genPayload([],'not Found',ACTIONTYPE.UPDATE), HttpStatus.FORBIDDEN);

    }

>>>>>>> master
}