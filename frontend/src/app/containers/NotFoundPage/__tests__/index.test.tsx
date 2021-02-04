import * as React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';

import { NotFoundPage } from '..';

const renderComponent = () =>
  render(
    <HelmetProvider>
      <NotFoundPage />
    </HelmetProvider>,
  );

describe('<NotFoundPage />', () => {
  it('should match the snapshot', () => {
    const component = renderComponent();
    expect(component.container.firstChild).toMatchSnapshot();
  });
});
