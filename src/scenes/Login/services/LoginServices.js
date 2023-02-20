import axios from 'axios';

//Constants
import * as APIConstants from '../../../constants/APIConstants';

export async function LoginWithGoogle(token) {
    try {
        const response = await axios({
            method: 'get',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/oauth/login?token=${token}`
        });

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            data: error
        };
    }
}