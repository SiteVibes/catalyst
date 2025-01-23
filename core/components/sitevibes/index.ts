const SV_API_HOST = process.env.SV_API_HOST;
const SV_PIXEL_KEY = process.env.SV_PIXEL_KEY;

export const createSiteVibesApp = async () => {
  const url = `https://${SV_API_HOST}/pixel/${SV_PIXEL_KEY}/manager?v=1.0.2`;
  const rs = await fetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });
  const rsData = await rs.json();

  return {
    config() {
        return rsData;
    }
  }
};
