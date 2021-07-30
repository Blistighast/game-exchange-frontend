import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';
import NotSignedIn from './NotSignedIn';

export default function Product({ product }) {
  return (
    <div>
      <ItemStyles>
        <img
          src={product?.photo?.image?.publicUrlTransformed} // ? checks if it exists before continuing
          alt={product.name}
        />
        <Title>
          <div>
            <Link href={`/product/${product.id}`}>{product.name}</Link>
          </div>
        </Title>
        <PriceTag>{formatMoney(product.price)}</PriceTag>
        <p>{product.description.length > 200 
          ? product.description.substring(0, 200) + '...' 
          : product.description}</p>
        <div className="buttonList">
          <NotSignedIn>
            <Link
              href={{
                pathname: 'update',
                query: {
                  id: product.id,
                },
              }}
            >
            {/* <Link href={`/update/${product.id}`}> */}
              Edit 🛠 {/* window + . gives you emoji options */}
            </Link>
            <AddToCart id={product.id} />
            <DeleteProduct id={product.id}>Delete</DeleteProduct>
          </NotSignedIn>
        </div>
      </ItemStyles>
    </div>
  );
}
