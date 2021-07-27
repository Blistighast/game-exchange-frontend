/* eslint-disable react/jsx-props-no-spreading */
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import gql from 'graphql-tag';
import { debounce } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import styled from 'styled-components';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const ItemCard = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts( # renamed allProducts to searchTerms
      where: {
        OR: [
          # OR lets you query for multiple things, there is also AND
          { name_contains_i: $searchTerm } # i means its case insensitive
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const router = useRouter();
  const [findItems, { data, error, loading }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache', // bypasses cache and always goes to network, don't want to cache search results
    }
  );
  const items = data?.searchTerms || [];
  const debouncedFindItems = debounce(findItems, 350); // only query searches at most every 350ms
  resetIdCounter(); // fixes differences between server render and frontend render
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items,
    onInputValueChange() {
      debouncedFindItems({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || '', // puts item name into search box when selected
  });
  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for a game',
            id: 'search',
            className: loading ? 'loading' : '',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen && // checks if searchbox is open first
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item })}
              highlighted={index === highlightedIndex}
            >
              <Link href={`/product/${item.id}`}>
                <ItemCard>
                  <img
                    src={item.photo.image.publicUrlTransformed}
                    alt={item.name}
                    width="50px"
                  />
                  {item.name}
                </ItemCard>
              </Link>
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No games found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
