import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

import handleError from '../functions/handleError';

export default function HandleAlert({ msg, status_code }) {
    return (
        <Stack sx={{ maxWidth: '50%' }} spacing={2}>
            <Alert severity="error">
                <AlertTitle>Error - {status_code}</AlertTitle>
                <strong>{handleError(status_code)}</strong>
                <br />
                {msg}
            </Alert>
        </Stack>
    );
}
