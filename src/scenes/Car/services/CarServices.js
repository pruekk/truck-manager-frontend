import axios from 'axios';

import * as APIConstants from "../../../constants/APIConstants";

export async function GetCars(token) {
    try {
        const response = await axios({
            method: 'get',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/cars`,
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

export async function AddNewCar(token, data) {
    try {
        data['editBy'] = JSON.parse(localStorage.getItem('userObject'))?.email;
        
        const response = await axios({
            method: 'post',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/cars`,
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

export async function EditCar(token, data) {
    try {
        data['editBy'] = JSON.parse(localStorage.getItem('userObject'))?.email;

        const response = await axios({
            method: 'put',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/cars/${data.id}`,
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

export async function DeleteCar(token, id) {
    try {
        const response = await axios({
            method: 'delete',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/cars/${id}`,
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