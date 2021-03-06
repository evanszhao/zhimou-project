import * as types from '../constants/ActionTypes'
// import RestUtil from '../utils/RestUtil'
import {
  // API_CHANNEL,
  API_STREAM_CHANNELONE,
} from '../constants/API'

export const getChannelList = () => {
  const source = new EventSource(API_STREAM_CHANNELONE);
  const hp = source.url.substring(0, source.url.indexOf('stream'))
  source.addEventListener('open', () => {
    console.log('Connected');
  }, false);

  source.addEventListener('error', e => {
    if (e.target.readyState === EventSource.CLOSED) {
      console.log('Disconnected');
    } else if (e.target.readyState === EventSource.CONNECTING) {
      console.log('Connecting...');
    }
  }, false);

  return async (dispatch) => {
    try {
      source.addEventListener('greeting', e => {
        let data = JSON.parse(e.data);
        data.message.img = hp.concat(data.message.img);
        console.log(`data: ${data.message}`);
        dispatch({
          type: types.CHANNEL,
          payload: data.message
        })
      }, false);
      // await RestUtil.get(API_CHANNEL)
    } catch (e) {
      console.error(e)
    }
  }
}

