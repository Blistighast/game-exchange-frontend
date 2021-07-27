import { useMutation } from '@apollo/client';
import { motion } from 'framer-motion';
import Router from 'next/router';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';
import { RotateXVariants } from './styles/AnimationVariants';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in and what types are they
    $name: String! # ! is for required
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: {
          #the photo is seperate and is relationally connected to Product as ProductImage in the db
          create: { image: $image, altText: $name }
        }
      }
    ) {
      # what we ask for back
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: '',
    price: null,
    description: '',
  });

  // this is query for creating the entry
  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      // below will rerender list on products page
      refetchQueries: [
        { query: ALL_PRODUCTS_QUERY /* ,variables would go here */ },
      ],
    }
  );

  return (
    <motion.div variants={RotateXVariants} initial="initial" animate="animate">
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          // submits the input fields to the backend:
          const response = await createProduct(); // the variables can also be input inside createProduct
          clearForm(); // the response from createProduct is the same as data in useMutation above either can be used
          // go to products page
          Router.push({
            pathname: `/product/${response.data.createProduct.id}`,
            // can also add query parameters as next arguement
          });
        }}
      >
        <DisplayError error={error} /> {/* from ErrorMessage.js  */}
        <fieldset disabled={loading} aria-busy={loading}>
          <label htmlFor="image">
            Image
            <input
              required
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            Price
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Price"
              value={inputs.price}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            Description
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              value={inputs.description}
              onChange={handleChange}
            />
          </label>
          <button type="submit">+ Add Product</button>
        </fieldset>
      </Form>
    </motion.div>
  );
}
