import { render, screen } from '@testing-library/react';
import NoResults from './NoResults';

describe('NoResults', () => {
    it('renders the component text', () => {
        render(<NoResults />);
        const noResultsWarning = screen.getByText(/No results were found!/i);
        expect(noResultsWarning).toBeInTheDocument();
    })
})