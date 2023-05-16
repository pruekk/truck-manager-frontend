import axios from 'axios';

import * as APIConstants from "../constants/APIConstants";

export async function GetComponent(component, token) {
    try {
        const response = await axios({
            method: 'get',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/${component}`,
            headers: { 'Authorization': `Bearer ${token}` }
        });

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            status: err.response.status,
            data: err
        }
    }
}

export async function AddNewData(data, component, token) {
    try {
        const response = await axios({
            method: 'post',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/${component}`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: { dataRows: data, editBy: JSON.parse(localStorage.getItem('userObject'))?.email }
        });

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            status: err.response.status,
            data: err
        }
    }
}

export async function EditData(data, component, token) {
    try {
        data['editBy'] = JSON.parse(localStorage.getItem('userObject')).email;

        const response = await axios({
            method: 'put',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/v2/${component}/${data._id}`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: data
        });

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            status: err.response.status,
            data: err
        }
    }
}

export async function DeleteData(data, component, token) {
    try {
        let deleteRows = [];
        if (["oil-delivery", "transports"].includes(component)) {
            deleteRows = data.map(obj => obj._id);
        } else {
            deleteRows = data;
        }

        const response = await axios({
            method: 'delete',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/v2/${component}`,
            headers: { 'Authorization': `Bearer ${token}` },
            data: { deleteRows: deleteRows }
        });

        return {
            success: true,
            status: response.status,
            data: response.data
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            status: err.response.status,
            data: err
        }
    }
}
