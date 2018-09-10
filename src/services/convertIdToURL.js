import {getFromCashe} from '../core/pages/info/duck'

const saveIdToCashe = (suffix, id) => {
	let cashe = getFromCashe();
	const SuffixAndId = suffix + '/' + id;
	if (cashe) {
		for (let i = 0; i < cashe.length; i++) {
			if (cashe[i] === SuffixAndId) {
				return false;
			}
		}
	} else {
		cashe = [];
	}
	cashe.push(SuffixAndId);
	window.localStorage.setItem('cashe', JSON.stringify(cashe));
}

const convertIdToURL = (cdn, suffix, id, postfix = '.jpg', mustSave = false) => () => {
	if (id) {
		const extIndex = id.lastIndexOf('.jpg');
		let clearId = id;
		if (extIndex !== -1) {
			clearId = id.slice(0, extIndex);
		}
        mustSave && suffix && saveIdToCashe(suffix, clearId);
		const url = suffix ? `${cdn}${suffix}/${clearId}.jpg` : `${cdn}${clearId}${postfix}`;
		return url;
	}
	return false;
}

export default convertIdToURL;
