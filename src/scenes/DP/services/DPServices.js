import axios from 'axios';

import * as APIConstants from "../../../constants/APIConstants";

export async function GetDP(token) {
    try {
        const response = await axios({
            method: 'get',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/dp`,
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

export async function AddNewDP(token, arr) {
    try {
        const response = await axios({
            method: 'post',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/dp`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: { dataRows: arr }
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

export async function EditDP(token, obj) {
    try {
        const response = await axios({
            method: 'put',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/dp/${obj.id}`,
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

export async function DeleteDP(token, arr) {
    try {
        const response = await axios({
            method: 'delete',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/dp`,
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