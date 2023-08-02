import { AsyncStorage } from 'react-native';
import Config from '../config';
  
const Database = async (params) => {
    console.log('params sent', params);
    var resp = await fetch(Config.APIEndpoint, {
        method: 'POST',
        headers: Config.Headers,
        body: JSON.stringify(params)
    });

    return await resp.json().then( async (jsonResp) => {
        console.log('returning json', jsonResp);
        return jsonResp;
    }).catch((err) => {
        return err;
    });
   
};

// query example

// getData = async () => {
    // var params = {
    //     Method: 'query',
    //     Module: 'Database',
    //     params: {
    //         query: 'SELECT * FROM Users'
    //     }
    // };
    // var result = await Database(params);
    // return result;
// };

export default Database;