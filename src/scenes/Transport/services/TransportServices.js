import axios from 'axios';

import * as APIConstants from "../../../constants/APIConstants";

export async function GetTransports(token) {
    try {
        const response = await axios({
            method: 'get',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/transports`,
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

export async function AddTransports(token, arr) {
    try {
        const response = await axios({
            method: 'post',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/transports`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: { dataRows: arr, editBy: JSON.parse(localStorage.getItem('userObject'))?.email }
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

export async function UpdateTransport(token, obj) {
    try {
        obj['editBy'] = JSON.parse(localStorage.getItem('userObject'))?.email;
        
        const response = await axios({
            method: 'put',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/transports/${obj._id}`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: obj
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

export async function DeleteTransports(token, arr) {
    try {
        const response = await axios({
            method: 'delete',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/transports`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: { deleteRows: arr }
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