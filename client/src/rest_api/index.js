class API {
    static login(username, password){
        let url = 'http://localhost:8888/api/login'
		
		let fetchData = {
			method: 'post',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: 'username=' + username + '&password=' + password,
		}	

		return fetch(url, fetchData)
			.then((response) => response.json())
	}
	
	static register(username, password){
        let url = 'http://localhost:8888/api/register'
		
		let fetchData = {
			method: 'post',
			headers: {'Content-Type':'application/x-www-form-urlencoded'},
			body: 'username=' + username + '&password=' + password,
		}	

		return fetch(url, fetchData)
			.then((response) => response.json())
    }
}

export default API