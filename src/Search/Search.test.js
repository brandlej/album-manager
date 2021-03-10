import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme'
import Search from './Search';


describe('Search', () => {
    it('renders search component', () => {
        render(<Search />);
        const searchInfoSuggestion = screen.getByText(/Search for an album:/i);
        const resetButtonText = screen.getByText(/Reset/i);
        expect(searchInfoSuggestion).toBeInTheDocument();
        expect(resetButtonText).toBeInTheDocument();
    })

    it('reset button emits handleReset on click', () => { 
        const handleResetSpy = jest.fn();
        const wrapper = shallow(<Search handleReset={handleResetSpy}/>)
        const resetButton = wrapper.find('#search-button')
        expect(resetButton.length).toEqual(1);
        resetButton.simulate('click', 'junk')
        expect(handleResetSpy.mock.calls.length).toEqual(1)
    })

    it('search input emits handleSearch on type', () => { 
        const handleSearchSpy = jest.fn();
        const wrapper = shallow(<Search handleSearch={handleSearchSpy}/>)
        const searchInput = wrapper.find('#search-input')
        expect(searchInput.length).toEqual(1);
        searchInput.simulate('change', { target: { value: 'a' } })
        expect(handleSearchSpy.mock.calls.length).toEqual(1)
    })
})