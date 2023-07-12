import { useMutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const CREATE_CATEGORY = gql`
  mutation createCategory ($name: String!){
    createCategory (name: $name){
      category{
             id
             name
      }
  }
}`;


export default function CreateCategory() {
  let name;
  const [createCategory] = useMutation(CREATE_CATEGORY);
return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          createCategory({ variables: {
            name: name.value,
        } });
        name.value = '';
        window.location.reload();
      }}
      style = {{ marginTop: '2em', marginBottom: '2em' }}
     >
     <label> Name: </label>
     <input
       ref={node => {
         name = node;
       }}
       style={{ marginRight: '1em' }}
     />

     <button type="submit" style={{ cursor: 'pointer' }}>Add a Category</button>
    </form>
   </div>
  );}