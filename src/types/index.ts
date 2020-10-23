
export type REFRESH_RESPONSE  = {
    "access_token": string,
    "expires_in": number,
    "api_domain":string,
    "token_type": string
}

export type MONTHSTAT = {
    helpline: number,
    donations: number
}

export type CITYSTAT = {
    city:string,
    open: number,
    closed: number,
    total: number,
    donations?: number,
    detail?:Record<string,MONTHSTAT[]>[];
}



