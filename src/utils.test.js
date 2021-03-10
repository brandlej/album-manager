import {
    getReadableConditionName,
    getAlbumColor
} from './utils';

describe('Utility functions', () => {
    describe('getReadableConditionName', () => {
        [
            {
                condition: 'poor',
                expectedOutput: 'Poor'
            },
            {
                condition: 'fair',
                expectedOutput: 'Fair'
            },
            {
                condition: 'good',
                expectedOutput: 'Good'
            },
            {
                condition: 'very_good',
                expectedOutput: 'Very good'
            },
            {
                condition: 'mint',
                expectedOutput: 'Mint'
            },
            {
                condition: 'custom',
                expectedOutput: 'Custom'
            }
        ].forEach(testCase => {
            it(`returns the proper readable name for ${testCase.condition} condition`, () => {
                expect(getReadableConditionName(testCase.condition)).toEqual(testCase.expectedOutput);
            });
        })
    });
    

    describe('getAlbumColor', () => {
        [
            {
                condition: 'poor',
                expectedOutput: 'red'
            },
            {
                condition: 'fair',
                expectedOutput: 'yellow'
            },
            {
                condition: 'good',
                expectedOutput: 'blue'
            },
            {
                condition: 'very_good',
                expectedOutput: 'green'
            },
            {
                condition: 'mint',
                expectedOutput: 'gold'
            },
            {
                condition: 'custom',
                expectedOutput: ''
            }
        ].forEach(testCase => {
            it(`returns the proper album color for ${testCase.condition} condition`, () => {
                expect(getAlbumColor(testCase.condition)).toEqual(testCase.expectedOutput);
            });
        })
    });
});