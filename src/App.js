import './App.css';
import styled from 'styled-components';
import SearchIcons from '../src/assets/images/loupe.png';
import HeaderIcons from '../src/assets/images/food-delivery.png';

import React,{ useState} from 'react';
import axios from 'axios';
import Dialog  from '@material-ui/core/Dialog';
import DialogContent  from '@material-ui/core/DialogContent';
import DialogTitle  from '@material-ui/core/DialogTitle';
import DialogActions from "@material-ui/core/DialogActions";

const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";


const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  color: #eb3300;
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
`;
const IngredientsText = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
  margin-bottom: 12px;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
`;

const RecipeComponent = (props) =>{
const [show, setShow] = useState(false);
//const { label, image,Ingredients,url} = props.recipe;
const {recipeObj} =props;
return(
  <RecipeContainer>
    <Dialog open={show}>
    
    <DialogTitle>Ingredients</DialogTitle>
    <DialogContent>
      
      <table>
<thead>
<th>Ingredients</th>
<th>Weight</th>
</thead>
<tbody>
  {recipeObj.ingredients.map((ingredientObj) => (
    <tr className='ingredient-list'>
      <td>{ingredientObj.text}</td>
      <td>{ingredientObj.weight}</td>
    </tr>
  ))}
</tbody>
        
      </table>
    </DialogContent>
    <DialogActions>
    <SeeNewTab onClick={() =>window.open(recipeObj.url)}>See More</SeeNewTab>
    <SeeNewTab onClick={() => setShow(false)}>Close</SeeNewTab>
    </DialogActions>
    </Dialog>
 <CoverImage src={recipeObj.image} alt='image'/>
<RecipeName>{recipeObj.label}</RecipeName>
 <IngredientsText onClick={()=>setShow(true)}>Ingredients</IngredientsText>
<SeeMoreText onClick={()=>window.open(recipeObj.url)} > See Complete Recipe</SeeMoreText> 

  </RecipeContainer>
);
  };


  const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const RecipeImage = styled.img`
  width: 36px;
  height: 36px;
  margin: 15px;
`;
// const Placeholder = styled.img`
//   width: 120px;
//   height: 120px;
//   margin: 200px;
//   opacity: 50%;
// `;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;



const App = ()=>{
  const [recipeList, updateRecipeList] = useState([]);
  const [timeoutId, updateTimeoutId] = useState("");

  const fetchRecipe = async (searchString) =>{
    const response = await axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (event)=>{
    clearTimeout(timeoutId);
    const timeout = setTimeout(()=>fetchRecipe(event.target.value),500);
updateTimeoutId(timeout);
  }

  return(
    <Container>
      <Header>
        <AppName>
          <RecipeImage src={HeaderIcons}/>
          Recipe Finder
        </AppName>
        <SearchBox>
          <SearchIcon src={SearchIcons}/>
          <SearchInput 
          placeholder="Search Recipe ex:egg"      
          onChange={onTextChange}/>
        </SearchBox>
      </Header>
      <RecipeListContainer>
        {recipeList.length && recipeList.map((recipeObj)=>(
          <RecipeComponent recipeObj={recipeObj.recipe} />
        ))}
        {/* {recipeList?.length?(
          recipeList.map((recipeObj)=>(
          <RecipeComponent recipe={recipeObj.recipe}/>
          ))
        ): (
          <Placeholder src={HeaderIcons}/>
        )} */}
      </RecipeListContainer>
    </Container>
  );
        };









export default App;
  