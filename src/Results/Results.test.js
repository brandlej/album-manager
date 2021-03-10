import { shallow } from 'enzyme'
import Results from './Results';
import Page1 from './../fixtures/page1.json';
import Page2 from './../fixtures/page2.json';
const { results: albums1 } = Page1;
const { results: albums2 } = Page2;

describe('Results', ()=> {
    it('Renders 25 albums', () => {
        const handleAlbumClickSpy = jest.fn();
        const handlePageClickSpy = jest.fn();
        const wrapper = shallow(<Results albums={albums1} pageNumbers={[]} handleAlbumClick={handleAlbumClickSpy} handlePageClick={handlePageClickSpy}/>)
        const albumsCollection = wrapper.find('#album-container');
        expect(albumsCollection.children().length).toEqual(25);
    })

    it('Renders proper number of page paginations', () => {
        const handleAlbumClickSpy = jest.fn();
        const handlePageClickSpy = jest.fn();
        const wrapper = shallow(<Results albums={[...albums1, ...albums2]} pageNumbers={[1,2]} handleAlbumClick={handleAlbumClickSpy} handlePageClick={handlePageClickSpy}/>)
        const paginationPageNumbers = wrapper.find('.page-number');
        expect(paginationPageNumbers.length).toEqual(2);
    })

    it('`handleAlbumClick` prop called on click of album', () => {
        const handleAlbumClickSpy = jest.fn();
        const handlePageClickSpy = jest.fn();
        const wrapper = shallow(<Results albums={albums1} pageNumbers={[1,2]} handleAlbumClick={handleAlbumClickSpy} handlePageClick={handlePageClickSpy}/>)
        const albumsCollection = wrapper.find('#album-container');
        const album = albumsCollection.children().first();
        album.simulate('click', 'junk')
        expect(handleAlbumClickSpy.mock.calls.length).toEqual(1)
    })

    it('`handlePageclick` prop called on click of album', () => {
        const handleAlbumClickSpy = jest.fn();
        const handlePageClickSpy = jest.fn();
        const wrapper = shallow(<Results albums={albums1} pageNumbers={[1,2]} handleAlbumClick={handleAlbumClickSpy} handlePageClick={handlePageClickSpy}/>)
        const pageNumber = wrapper.find('.page-number').first();
        pageNumber.simulate('click', 'junk')
        expect(handlePageClickSpy.mock.calls.length).toEqual(1)
    })

    it('Individual album renders with appropriate content', () => {
        const expectedTextContent = 'Artist Name: Sex PistolsAlbum Title: Cardigan Letterpress ScenesterYear: 1967Record Condition: Poor';
        const handleAlbumClickSpy = jest.fn();
        const handlePageClickSpy = jest.fn();
        const wrapper = shallow(<Results albums={albums1} pageNumbers={[1,2]} handleAlbumClick={handleAlbumClickSpy} handlePageClick={handlePageClickSpy}/>)
        const albumsCollection = wrapper.find('#album-container');
        const album = albumsCollection.children().first();
        expect(album.text()).toEqual(expectedTextContent);
    })
})