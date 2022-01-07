/* 专门管理请求各种接口 */
import Network from './network'
export const getBanner = () => Network.get('/banner?type=2')
export const getPersonalized = () => Network.get('/personalized?limit=6')
export const getNewAlbum = () => Network.get('/album/newest')
export const getNewSong = () => Network.get('/personalized/newsong')
