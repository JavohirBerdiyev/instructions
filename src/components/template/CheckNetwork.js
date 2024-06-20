import React from 'react'
import {Notification, toast} from "../ui";
import {t} from "i18next";


export const CheckNetwork = (error) => {

    toast.push(
        <Notification
            title={`${t('notification.error')}: ${error?.message}`}
            type="danger"
            duration={3500}
        >
        </Notification>,
        {
            placement: "top-center",
        },
    );
}



