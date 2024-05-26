import { Pool} from 'pg'
 require ('dotenv').config()
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: Number(process.env.DB_PORT),
})
console.log(process.env.DB_USER)
console.log("DB conected")
export default pool;  