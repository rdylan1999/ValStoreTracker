
const fetchEntitlement = async (authToken) =>
{
    try {
        const response = await fetch('https://entitlements.auth.riotgames.com/api/token/v1', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: {}
        });

        if (response.ok){
            return await response.json();
        }

    }
    catch (error){
        console.log(error);
    }
}

const fetchRegion = async (accessToken, idToken) => {

    try {
        const response = await fetch('https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant', {
            method: 'PUT',
            headers:  {
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                id_token: idToken,
            }),
        });

        if (response.ok){
            return await response.json();
        }
    }

    catch (error){
        console.log(error);
    }

}

export const fetchPlayerInfo = async (accessToken) =>
{
    const response = await fetch('https://auth.riotgames.com/userinfo', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if(response.ok){
        return await response.json();
    }
}

export const authenticate = async (accessToken, idToken) => {


    let jsonData = await fetchEntitlement(accessToken);
    jsonData = JSON.parse(JSON.stringify(jsonData));
    const entitlementsToken = jsonData.entitlements_token;
    jsonData = await fetchPlayerInfo(accessToken);
    const puuid = jsonData.sub;

    return {
        accessToken: accessToken,
        entitlementsToken: entitlementsToken,
        puuid: puuid
    }
}