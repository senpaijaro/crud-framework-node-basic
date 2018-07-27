'use strict'
import Controller from 'system/Controller'
import UserMod from 'model/UserModel'
class UserController extends Controller {

	constructor(){
		super()
	}
	
	async index(req, res){
		const data = {
			title : 'Basic babel framework',
			content_header: 'Hello Template'
		}
		io.on('connection', function(socket){
			socket.on('chat message', function(msg){
				io.emit('chat messages', msg)
			})
		})
		await this.view(res, 'index', data)
	}

	async addUser(req, res){
		req.assert('txtfname', 'Firstname is required').notEmpty()
		req.assert('txtmname', 'Middlename is required').notEmpty()
		req.assert('txtlname', 'Lastname is required').notEmpty()

		let getError = await this.getError(req)
		if(getError === true){
			res.redirect('/basic_framework')
		}else{
			res.end(getError)
		}
	}

	
}
// export default new UserController
module.exports = new UserController