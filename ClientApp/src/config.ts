const _DEV_ = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const DEV_HOST = 'http://localhost:7071';
const PROD_HOST = 'https://room-vision-api.azurewebsites.net';
const HOST = _DEV_ ? DEV_HOST : PROD_HOST;

// Get Positions Azure Function Endpoint
const API_Get_Positions_Path = '/api/GetPositions';
const API_Get_Positions_Key = '?code=wIhl15oet6SMillHoS1QCejSpNssPFnqZPRHIswasMMmnkYu5kCyag==';
export const API_Get_Positions_Endpoint = HOST + API_Get_Positions_Path + API_Get_Positions_Key;


// Post Positions Azure Function Endpoint
const API_Post_Positions_Path = '/api/SavePositions';
const API_Post_Positions_Key = '?code=5l3hF6YDtEmEmdXM48qAuZMit3N/dArsmeW7XkeMrNJoP1QqN48rYg==';
export const API_Post_Positions_Endpoint = HOST + API_Post_Positions_Path + API_Post_Positions_Key;

