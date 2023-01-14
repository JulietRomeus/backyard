import now from './now'
export default function genPayload(data:any,error:any){

    
    return {
        status: !error?200:500,
        message: !error?'GET_SUECESS':'GET_FAIL',
        data: data,
        error: error,
        timestamp: now(),
      }
}