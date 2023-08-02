const Config = {};
Config.authorizationToken = 'c2F1bUBhbHR1c2pvYnMuY29tOkJpbGxpb25zNDAh';
Config.Headers = {
    Authorization: 'Basic ' + Config.authorizationToken,
    Accept: 'application/json',
    'Content-Type': 'application/json'
};
Config.APIEndpoint = 'http://192.169.217.115:7099/partyfinder/';

export default Config;