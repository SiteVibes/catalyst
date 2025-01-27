const SV_API_HOST = process.env.SV_API_HOST;
const SV_PIXEL_KEY = process.env.SV_PIXEL_KEY;

const storage: any = {};

export const createSiteVibesApp = async () => {
  let result = null;

  const cachedRs = getConfig('SV_PIXEL_CONFIG');
  if (cachedRs) {
    console.log('### USING CACHED CONFIG ###');
    result = cachedRs;
  } else {
    console.log('### FETCH DATA FROM SERVER ###');
    const url = `https://${SV_API_HOST}/pixel/${SV_PIXEL_KEY}/manager?v=1.0.2`;
    const rs = await fetch(url, {
      method: 'get',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    const rsData = await rs.json();
    const { config } = rsData;
    const configClearText = decryptResponse(config);

    var configObj = eval('(function() { return ' + configClearText + '}())');
    setConfig('SV_PIXEL_CONFIG', configObj);
    result = configObj;
  }

  return {
    config() {
      return result;
    },
  };
};

function str_rot13(str: string) {
  return (str + '').replace(/[a-z]/gi, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
  });
}

function decryptResponse(input: string): any {
  let output = input;

  try {
    output = str_rot13(output);
    const buff = Buffer.from(output, 'base64');
    output = buff.toString('ascii');
    output = JSON.parse(output);
  } catch (e) {
    return null;
  }

  return output;
}

function setConfig(key: string, value: any) {
  const d = {
    data: JSON.stringify(value),
    expireTime: Date.now() + 60 * 1000,
  };
  storage[key] = JSON.stringify(d);
}

function getConfig(key: string) {
  const data = storage[key];
  if (!data) {
    return null;
  }
  let result = JSON.parse(data);
  if (result.expireTime <= Date.now()) {
    delete storage[key];
    return null;
  }
  return JSON.parse(result.data);
}
