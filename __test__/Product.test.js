import { MockedProvider } from "@apollo/react-testing";
import { render, screen } from "@testing-library/react";
import { fakeItem } from "../lib/testUtils";
import Product from "../components/Product";

const product = fakeItem();

describe("<Product/>", () => {
  it("renders out the title and price tag", () => {
    const { container, debug } = render(
      // need to use the mock provider because of apollo, pretends component is wrapped in the apollo provider
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    const priceTag = screen.getByText('$50')
    const link = container.querySelector('a')
    expect(priceTag).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/product/abc123'); // can use direct string
    expect(link).toHaveTextContent(product.name); // or use the variable from the props
  });

  it('renders and matches the snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  })
});
