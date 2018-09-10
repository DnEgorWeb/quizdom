const getFullPath = (path) => {
    if (!path) {
        return '';
    }
    return 'images/pool_icons/' + path.split('/').map(el => encodeURIComponent(el)).join('/') + '.svg';
}

export default getFullPath;
