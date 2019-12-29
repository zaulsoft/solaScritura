import pg,{ Pool } from 'pg';
import keys from '././keys';
 
const pool = new Pool(keys.database)

pool.connect()
.then(function(){
	console.log('Database is connected!')
})

export default pool;