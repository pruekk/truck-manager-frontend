import axios from 'axios';

import * as APIConstants from "../../../constants/APIConstants";

export async function GetCarReplacement(token) {
    try {
        const response = await axios({
            method: 'get',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/car-replacement`,
            headers: { 'Authorization': `Bearer ${token}` }
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

export async function AddNewCarReplacement(token, data) {
    try {
        data['editBy'] = JSON.parse(localStorage.getItem('userObject'))?.email;
        
        const response = await axios({
            method: 'post',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/car-replacement`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: data
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

export async function EditCarReplacement(token, data) {
    try {
        data['editBy'] = JSON.parse(localStorage.getItem('userObject'))?.email;

        const response = await axios({
            method: 'put',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/car-replacement/${data.carId}`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: data
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

export async function DeleteCarReplacement(token, id) {
    try {
        const response = await axios({
            method: 'delete',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/car-replacement/${id}`,
            headers: { 'Authorization': `Bearer ${token}` }
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