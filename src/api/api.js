/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-09-16 19:00:33
 * @version $Id$
 */
import axios from 'axios'
const api = axios.create({
  baseURL: 'http://119.23.212.109/api',
})
export default api
