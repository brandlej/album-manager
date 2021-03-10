import { shallow } from 'enzyme'
import EditAlbum from './EditAlbum';
import Page1 from './../fixtures/page1.json';
const { results: albums } = Page1;

describe('EditAlbum', ()=> {
    [
        {
            selector: '#name-input',
            expectedField: 'name'
        },
        {
            selector: '#title-input',
            expectedField: 'title'
        },
        {
            selector: '#year-input',
            expectedField: 'year'
        },
        {
            selector: '#condition-input',
            expectedField: 'condition'
        }
    ].forEach(testCase => {
        it(`'updateAlbumSpy' prop called on updating album ${testCase.expectedField} input`, () => {
            const expectedAlbum = {
                'album_title': 'Cardigan Letterpress Scenester',
                'artist': {
                    'id': 0,
                    'name': 'Sex Pistols'
                }, 
                'condition': 'poor',
                'year': 1967
            }
            const updateAlbumSpy = jest.fn();
            const wrapper = shallow(<EditAlbum album={albums[0]} updateAlbum={updateAlbumSpy}/>)
            const nameInput = wrapper.find(testCase.selector);
            nameInput.simulate('change', { target: { value: 'Hello' } })
            expect(updateAlbumSpy.mock.calls.length).toEqual(1)
            expect(updateAlbumSpy).toHaveBeenCalledWith(testCase.expectedField, {'target': {'value': 'Hello'}}, expectedAlbum);
        });
    })

    it('EditAlbum component renders with appropriate content', () => {
        const expectedTextOutput = 'xEdit AlbumArtist Name:Album Title:Year:Record Condition:';
        const updateAlbumSpy = jest.fn();
        const wrapper = shallow(<EditAlbum album={albums[0]} updateAlbum={updateAlbumSpy}/>)
        const editAlbumPane = wrapper.find('.edit-album-pane');
        // could add extra validations here around proper DOM nodes getting rendered
        expect(editAlbumPane.text()).toEqual(expectedTextOutput);
    })
})