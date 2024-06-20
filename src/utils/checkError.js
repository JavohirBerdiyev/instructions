import React from "react";
import AccessDenied from "../views/pages/AccessDenied";
import NoData from "../views/pages/NoData";

export const  checkError =  (error, data, loading) =>{

    if (error?.response?.status === 403) {
        return <AccessDenied />
    } else if (data?.length === 0 && error?.response?.status !== 403 && loading === false) {
        return <NoData />
    }
}

