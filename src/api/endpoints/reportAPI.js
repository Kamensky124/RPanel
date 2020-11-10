import {instance} from '../instance';

import FileDownload from 'js-file-download';

export const reportAPI = {
    getReport(type = 'customers') {   
        return instance.get(`report/${type}`, {responseType: 'blob'})
            .then(response => {                          
                FileDownload(response.data, `${type}.xlsx`);
                return response.data;
            })
            .catch(error => {
                return {error};
            });
    },
}