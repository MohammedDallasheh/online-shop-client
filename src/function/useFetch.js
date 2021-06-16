import { useState, useEffect } from 'react';
import axios from 'axios';

const isStr = (str) => typeof str === 'string';

export const useFetch = (props = {}) => {
  if (isStr(props)) {
    var defaultUrl = props;
  } else var { defaultUrl, defaultData = [], dataMap } = props;

  const newData = (data) => (dataMap ? dataMap(data) : data);

  const [status, setStatus] = useState(true);
  const [data, setData] = useState(newData(defaultData));
  const [method, setMethodState] = useState('get');
  const [req, setReq] = useState([defaultUrl, undefined, undefined]);

  const setUrl = (url) =>
    isStr(url) && setReq((oldReq) => [url, oldReq[1], oldReq[2]]);

  const setBody = (body) =>
    body &&
    setReq((oldReq) => [oldReq[0], JSON.stringify(body), oldReq[2]]);
  const setConfig = (config) =>
    config && setReq((oldReq) => [oldReq[0], oldReq[1], config]);

  const setMethod = (method) => {
    if (['post', 'put'].includes(method))
      return setMethodState(method);
    if (['get', 'delete'].includes(method)) {
      setMethodState(method);
      setReq(([url]) => [url]);
    }
  };
  const setFetch = (props) => {
    if (isStr(props)) return setUrl(props);

    const { method: userMethod, url: userUrl, body, config } = props;
    setUrl(userUrl);
    setBody(body);
    setConfig(config);

    setMethod(userMethod);
  };

  useEffect(() => {
    if (!isStr(req[0])) return;
    // console.log(req, method);
    setData(newData(defaultData));
    (async () => {
      try {
        const { data } = await axios[method]?.(...req);
        setData(newData(data));
        setStatus(false);
      } catch (err) {
        console.log(err);
        setData(newData(defaultData));
        setStatus(true);
      }
    })();
  }, [req[0], req[1], method]);

  return { status, data, setFetch, setUrl, setStatus };
};
