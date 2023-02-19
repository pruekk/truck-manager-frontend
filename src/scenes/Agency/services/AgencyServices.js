import axios from 'axios';

import * as APIConstants from "../../../constants/APIConstants";

export async function GetAgency() {
    try {
        const response = await axios({
            method: 'get',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/agency`
        });

        return {
            success: true,
            data: response.data
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            data: err
        }
    }
}