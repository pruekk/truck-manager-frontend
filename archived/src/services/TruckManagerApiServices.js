import axios from 'axios';
import useSWR from "swr";

import * as APIConstants from "../constants/APIConstants";

const fetcher = url => axios({
    method: 'get',
    url: url,
    headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
}).then(res => res.data)

export function GetData({component}) {
    const { data, error, isLoading } = useSWR(`${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/${component}`, fetcher, { refreshInterval: 1000 })
    return { data, error, isLoading }
}

export async function GetComponent({component}) {
    try {
        const response = await axios({
            method: 'get',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/${component}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` }
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

export async function AddNewData({data, component}) {
    try {
        const response = await axios({
            method: 'post',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/${component}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` },
            data: { dataRows: data, editBy: JSON.parse(localStorage.getItem('userObject')).email }
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

export async function EditData(data, component) {
    try {
        data['editBy'] = JSON.parse(localStorage.getItem('userObject')).email;

        const response = await axios({
            method: 'put',
            url: `${APIConstants.TRUCK_MANAGER_SYSTEM_API_BASE_URL}/v2/${component}/${data._id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` },
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

export async function DeleteData(data, component) {
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
            headers: { 'Authorization': `Bearer ${localStorage.getItem('userToken')}` },
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
