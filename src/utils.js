import capitalize from 'lodash/capitalize';

export function getAlbumData () {
    return fetch('/api/albums').then(res => res.json());
}

export function getReadableConditionName (condition) {
    const conditionMap = {
        'poor': 'poor',
        'fair': 'fair',
        'good': 'good',
        'very_good': 'very good',
        'mint': 'mint'
    };
    return capitalize(conditionMap[condition]) || capitalize(condition);
}

export function getAlbumColor (condition) {
    const colorMap = {
        'poor': 'red',
        'fair': 'yellow',
        'good': 'blue',
        'very_good': 'green',
        'mint': 'gold'
    }
    return colorMap[condition] || '';
}
