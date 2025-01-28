const SV_API_HOST = process.env.SV_API_HOST;
const SV_PIXEL_KEY = process.env.SV_PIXEL_KEY;

export const createSiteVibesApp = async () => {
  const url = `https://${SV_API_HOST}/pixel/${SV_PIXEL_KEY}/manager?v=1.0.2`;
  const rs = await fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });
  const rsData = await rs.json();
  const { config } = rsData;
  const configClearText = decryptResponse(config);

  const configData = eval('(function() { return ' + configClearText + '}())');

  return {
    config() {
      return configData;
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
