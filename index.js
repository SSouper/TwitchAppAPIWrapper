var fetch = require('node-fetch-retry');

const SITE = "https://addons-ecs.forgesvc.net/api/";
const VERSION = "v2";

async function get(endpoint, json = true)
{ 
	const response = await fetch(SITE + VERSION + endpoint);
	let result;

	if(json)
	{
		result = await response.json();
	} else
	{
		result = await response.text();
	}

	return result;
}

async function post(endpoint, jsonData, json = true)
{
	const response = await fetch(SITE + VERSION + endpoint, 
	{
		method: 'POST',
		headers: 
		{
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		retry: 5,
		body: JSON.stringify(jsonData)
	});

	if(json)
	{
		result = await response.json();
	} else
	{
		result = await response.text();
	}

	return result;
}

async function getAddonInfo(addonID)
{
	if(isNaN(addonID)) throw new Error('addonID was not a number!');
	
	return get('/addon/' + addonID);
}

async function getMultipleAddons(addonIDArray)
{
	return post('/addon', addonIDArray);
}

async function addonSearch(categoryID, gameId, gameVersion, index, pageSize, searchFilter, sectionId, sort)
{
	if(isNaN(categoryID)) throw new Error('categoryID was not a number!');
	if(isNaN(gameId)) throw new Error('gameId was not a number!');
	if(isNaN(index)) throw new Error('index was not a number!');
	if(isNaN(pageSize)) throw new Error('pageSize was not a number!');
	if(isNaN(sectionId)) throw new Error('sectionId was not a number!');
	if(isNaN(sort)) throw new Error('sort was not a number!');

	return get(`/addon/search?categoryId=${categoryID}&gameId=${gameId}&gameVersion=${encodeURI(gameVersion)}&index=${index}&pageSize=${pageSize}&searchFilter=${encodeURI(searchFilter)}&sectionId=${sectionId}&sort=${sort}`);
}

async function getAddonDescription(addonID)
{
	if(isNaN(addonID)) throw new Error('addonID was not a number!');
	
	return get(`/addon/${addonID}/description`, false);
}

async function getAddonFileChangelog(addonID, fileID)
{
	if(isNaN(addonID)) throw new Error('addonID was not a number!');
	if(isNaN(fileID)) throw new Error('fileID was not a number!');
	
	return get(`/addon/${addonID}/file/${fileID}/changelog`, false);
}

async function getAddonFileInformation(addonID, fileID)
{
	if(isNaN(addonID)) throw new Error('addonID was not a number!');
	if(isNaN(fileID)) throw new Error('fileID was not a number!');
	
	return get(`/addon/${addonID}/file/${fileID}`);
}

async function getAddonFiles(addonID)
{
	if(isNaN(addonID)) throw new Error('addonID was not a number!');
	
	return get(`/addon/${addonID}/files`);
}

async function getFeaturedAddons(gameId, addonIds, featuredCount, popularCount, updatedCount)
{
	if(isNaN(gameId)) throw new Error('gameId was not a number!');
	if(isNaN(featuredCount)) throw new Error('featuredCount was not a number!');
	if(isNaN(popularCount)) throw new Error('popularCount was not a number!');
	if(isNaN(updatedCount)) throw new Error('updatedCount was not a number!');
	

	return post('/addon/featured', {GameId: gameId, addonIds: addonIds, featuredCount: featuredCount, popularCount: popularCount, updatedCount: updatedCount});
}

async function getAddonsDatabaseTimestamp()
{
	return get(`/addon/timestamp`);
}

async function getAddonByFingerPrint(arr)
{
	return post('/fingerprint', arr);
}

async function getMinecraftVersionTimestamp()
{
	return get('/minecraft/version/timestamp');
}

async function getMinecraftVersionList()
{
	return get('/minecraft/version');
}

async function getMinecraftVersionInfo(versionString)
{
	return get(`/minecraft/version/${versionString}`);
}

async function getModloaderVersionTimestamp()
{
	return get('/minecraft/modloader/timestamp');
}

async function getModloaderVersionList()
{
	return get('/minecraft/modloader');
}

async function getModloaderVersionInfo(versionString)
{
	return get(`/minecraft/modloader/${versionString}`);
}

async function getCategoryTimestamp()
{
	return get('/category/timestamp');
}

async function getCategoryList()
{
	return get('/category');
}

async function getCategoryInfo(categoryID)
{
	if(isNaN(categoryID)) throw new Error('categoryID was not a number!');
	return get(`/category/${categoryID}`);
}

async function getCategorySectionInfo(sectionId)
{
	if(isNaN(sectionId)) throw new Error('sectionId was not a number!');
	return get(`/category/section/${sectionId}`);
}

async function getGameTimestamp()
{
	return get('/game/timestamp');
}

async function getGamesList(supportsAddons)
{
	return get(`/game?${supportsAddons}`);
}

async function getGameInfo(gameId)
{
	return get(`/game/${gameId}`);
}

function overwriteFetch(newFetch) // temp function to test https://www.npmjs.com/package/make-fetch-happen
{
	fetch = newFetch;
}

module.exports = 
{
	getAddonInfo: getAddonInfo,
	getMultipleAddons: getMultipleAddons,
	addonSearch: addonSearch,
	getAddonDescription: getAddonDescription,
	getAddonFileChangelog: getAddonFileChangelog,
	getAddonFileInformation: getAddonFileInformation,
	getAddonFiles: getAddonFiles,
	getFeaturedAddons: getFeaturedAddons,
	getAddonsDatabaseTimestamp: getAddonsDatabaseTimestamp,
	getAddonByFingerPrint: getAddonByFingerPrint,
	getMinecraftVersionTimestamp: getMinecraftVersionTimestamp,
	getMinecraftVersionList: getMinecraftVersionList,
	getMinecraftVersionInfo: getMinecraftVersionInfo,
	getModloaderVersionTimestamp: getModloaderVersionTimestamp,
	getModloaderVersionList: getModloaderVersionList,
	getModloaderVersionInfo: getModloaderVersionInfo,
	getCategoryTimestamp: getCategoryTimestamp,
	getCategoryList: getCategoryList,
	getCategoryInfo: getCategoryInfo,
	getCategorySectionInfo: getCategorySectionInfo,
	getGameTimestamp: getGameTimestamp,
	getGamesList: getGamesList,
	getGameInfo: getGameInfo,
	overwriteFetch: overwriteFetch
};
