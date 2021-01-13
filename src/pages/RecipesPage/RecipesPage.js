import { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import NewRecipeModal from "../../components/NewRecipeModal/NewRecipeModal";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import AppNavbr from "../../components/AppNavbar/AppNavbr";
import './RecipesPage.css'
import Parse from 'parse';
import RecipeModel from "../../model/RecipeModel";

function RecipesPage(props) {
    const {activeUser, onLogout} = props;
    const [showModal, setShowModal] = useState(false);
    const [recipes, setRecipes] = useState([]);

    useEffect(()=> {
        async function fetchData() {
            const ParseRecipe = Parse.Object.extend('Recipe');
            const query = new Parse.Query(ParseRecipe);
            query.equalTo("userId", Parse.User.current());
            const ParseRecipes = await query.find();
            setRecipes(ParseRecipes.map(parseRecipe => new RecipeModel(ParseRecipe)));
        }

        if (activeUser) {
            fetchData()
        }
    }, [activeUser])

    async function addRecipe(name, desc, img) {
        const ParseRecipe = Parse.Object.extend('Recipe');
        const newRecipe = new ParseRecipe();
        
        newRecipe.set('name', name);
        newRecipe.set('desc', desc);
        newRecipe.set('img', new Parse.File(img.name, img));
        newRecipe.set('userId', Parse.User.current());
        
        const parseRecipe = await newRecipe.save();
        setRecipes(recipes.concat(new RecipeModel(parseRecipe)));
    }

    if (!activeUser) {
        return <Redirect to="/"/>
    }

    const recipesView = recipes.map(recipe => <Col key={recipe.id} lg={3} md={6}><RecipeCard recipe={recipe}/></Col>)

    return (
        <div className="p-recipes">
            <AppNavbr activeUser={activeUser} onLogout={onLogout}/>
            <Container>
                <div className="heading">
                    <h1>{activeUser.fname}'s Recipes</h1>
                    <Button variant="link" onClick={() => setShowModal(true)}>New Recipe</Button>
                </div>
                <Row>
                    {recipesView}
                </Row>
            </Container>
            <NewRecipeModal show={showModal} handleClose={() => setShowModal(false)} addRecipe={addRecipe}/>
        </div>
    )

}

export default RecipesPage;