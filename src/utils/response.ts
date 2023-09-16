export const response = (status: boolean, message: string, data:any = null) => {
    if(data == null) return {status, message}
    return {status, message, data}
}