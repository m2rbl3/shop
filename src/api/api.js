/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-09-16 19:00:33
 * @version $Id$
 */
export default {
  /*请求商店列表数据*/
  getShopListData(comit){
    return Vue.axios({
        url:'http://110.23.212.109/api/shopList',
        method: 'get'
       }).then( res => commit( 'LOAD_SHOP_LIST', res.data ))
       .catch( err => console.log( err )); 
  }
}