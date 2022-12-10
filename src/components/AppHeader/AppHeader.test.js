import renderer from 'react-test-renderer';
import { MemoryRouter } from "react-router-dom";
import AppHeader from './AppHeader';

const testElement = (
  <MemoryRouter>
      <AppHeader />
  </MemoryRouter>
);

describe('AppHeader', () => {
    it('рендерится без ошибок', () => {
        const tree = renderer
        .create(testElement)
        .toJSON();
        expect(tree).toMatchSnapshot();
      });
})