import gql from 'graphql-tag';
import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything, dont use default
    read(existing = [], { args, cache }) {
      // args are the first and skip values, cache is existing cache
      const { skip, first } = args;

      // read the number of items on the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if
      // there are items
      // AND there arent enough items to satisfy how many were requested
      // AND we're on the last page
      // then just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we dont have any items, we must go to network to fetch
        return false;
      }
      // if there are items, just return them from the cache, dont need to go to network
      if (items.length) {
        return items;
      }

      return false; // fallback to network if both if statements dont work
      // first thing apollo does is askes the read function for those items
      // we can either do 1 of 2 things
      // first: can return the items because they are already in the cache
      // two: return false from here, (make a new network request)
    },

    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when apollo client comes back from network with out products
      const merged = existing ? existing.slice(0) : []; // if there is cache makes a copy
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }
      // finally we return the merged items from the cache
      return merged;
    },
  };
}
