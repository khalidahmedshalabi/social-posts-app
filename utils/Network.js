import axios from 'axios';
import { base_url } from '../constants/Server';

// This function, handles when the response is a success/failure
export const HandleHttpResponses = (response, onSuccess, onFailure) => {
	switch (response.status) {
		case 200: // SUCCESS
		{
			onSuccess(response);
			break;
		}
		default:
		{
			onFailure(response);
			break;
		}
	}
}

const HTTP_REQUEST = (
	method, endpoint, post_data, 
	onSuccess, onFailure) => {
	axios({
		method,
		headers: { 'Content-Type': 'application/json' },
		url: `${base_url}/${endpoint}`,
		data: post_data
	}).then(function (response) {
		HandleHttpResponses(
			response,
			onSuccess,
			onFailure);
	}).catch(function (error) {
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			HandleHttpResponses(
				error.response,
				onSuccess,
				onFailure);
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
			onFailure(error);
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
			onFailure(error);
		}
		console.log(error.config);
	});
}

export const POST = (endpoint, post_data, onSuccess, onFailure) => {
	HTTP_REQUEST('post', endpoint, post_data, onSuccess, onFailure);
}

export const GET = (endpoint, onSuccess, onFailure) => {
	HTTP_REQUEST('get', endpoint, null, onSuccess, onFailure);
}

export default { GET, POST };