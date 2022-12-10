import renderer from 'react-test-renderer';
import { MemoryRouter } from "react-router-dom";
import AppLayout from './AppLayout';

const testElement = (
  <MemoryRouter>
      <AppLayout />
  </MemoryRouter>
);

describe('AppLayout', () => {
    it('рендерится без ошибок', () => {
        const tree = renderer
        .create(testElement)
        .toJSON();
        expect(tree).toMatchSnapshot();
      });
})