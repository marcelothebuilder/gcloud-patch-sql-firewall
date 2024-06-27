#!/usr/bin/env node

import axios from 'axios';
import { promisify } from 'util';
import { exec } from 'child_process';
import { v4 as publicIpv4 } from 'public-ip';
import { hostname as _hostname } from 'os';
import { getMandatoryArg, getOptionalArg } from './argv.js';

const execAsync = promisify(exec);

const axiosInstance = axios.create({
    baseURL: 'https://www.googleapis.com/',
})

const configuration = getOptionalArg('gcloud-configuration', 'default');
const projectId = getMandatoryArg('gcloud-project-id');
const instanceId = getMandatoryArg('gcloud-instance-id');

const hostname = _hostname();

const ENTRY_NAME = hostname;

; (async () => {
    try {

        const endpoint = `sql/v1beta4/projects/${projectId}/instances/${instanceId}`;

        console.log('Get GCloud Token');
        const gCloudToken = await getGCloudToken();
        console.log('Got GCloud Token');

        const { data } = (await axiosInstance.get(endpoint, {
            params: {
                fields: 'settings'
            },
            headers: {
                'Authorization': `Bearer ${gCloudToken}`
            }
        }));

        const { authorizedNetworks } = data.settings.ipConfiguration;

        let ourIp = authorizedNetworks.find(entry => entry.name === ENTRY_NAME);

        const myIp = await publicIpv4();

        if (!ourIp) {
            ourIp = { value: myIp, name: ENTRY_NAME, kind: 'sql#aclEntry' };
            authorizedNetworks.push(ourIp);
        }

        ourIp.value = myIp;

        const body = {
            "settings": {
                "ipConfiguration": {
                    "authorizedNetworks": authorizedNetworks
                }
            }
        }

        console.log(`Allowing ip ${myIp}`);

        await axiosInstance.patch(endpoint, body, {
            headers: {
                'Authorization': `Bearer ${gCloudToken}`
            }
        });

        console.log(`Allowed ip ${myIp} for instance ${instanceId}, project ${projectId} for configuration ${configuration}`);



    } catch (e) {
        console.error(e);
    }
})()

async function getGCloudToken() {
    return (await execAsync(`gcloud auth print-access-token --configuration=${configuration}`)).stdout.trim();
}


// 
