export function isSuccessResponse(response : any): boolean {
    return !!response.data;
}

export function isErrorResponse(response: any) : boolean {
    return !!response.error;
}