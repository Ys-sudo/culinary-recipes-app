import React from "react";
import { useState, useEffect  } from "react";
import Logout from "../components/auth/Logout";
import { useNavigate } from "react-router-dom";
import Center from "../components/utils/Center";
import {
  Button,
  Typography,
  Input,
  InputLabel,
  Select,
  MenuItem,
  TextareaAutosize,
  FormControl,
} from "@mui/material";
import { getDatabase, ref, set } from "firebase/database";


const AddRecipe = (props) => {
  useEffect(() => {}, []); // eslint-disable-line react-hooks/exhaustive-deps
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

const combineArrays = (first, second) => {
     return first.reduce((acc, val, ind) => {
        acc[val] = second[ind];
        return acc;
     }, {});
  };

  const handleSubmit = async (error) => {
    error.preventDefault();
    setErrorMessage(error.code + ": " + error.message);
    let name = document.getElementById('name').value;
    let imageUrl = document.getElementById("r-image").src;
    let time = document.getElementById('time').value;
    let level = document.getElementById('level').value;
    let description = document.getElementById('description').value;

    let inds = [];
    let quants = [];

    for (let i=0;i<document.getElementsByClassName('shortinput').length;i++){
      //console.log(document.getElementsByClassName('shortinput')[i].value);
      quants.push(document.getElementsByClassName('shortinput')[i].value);
      //console.log(document.getElementsByClassName('longinput')[i].value);
      inds.push(document.getElementsByClassName('longinput')[i].value);
    }
    let combined =  combineArrays(quants,inds);

    let ingredients = JSON.stringify(combined);
    console.log(ingredients);

    writeRecipeData(name,imageUrl,time,level,ingredients,description);
    navigate("/");

  };


  function writeRecipeData(name,imageUrl,time,level,ingredients,description) {
    const db = getDatabase();

    set(ref(db, 'Recipes/' + name ), {
      name: name,
      image: imageUrl,
      time: time,
      level: level,
      ingredients: ingredients,
      description: description,
    });
  }



  const [level, setLevel] = React.useState("");

  const handleChange = (event) => {
    setLevel(event.target.value);
    document.getElementById('level').value = event.target.value;
    console.log(document.getElementById('level').value);
  };

  const loadImg = () => {
    let fileinput = document.getElementById("fileinput");
    let file = fileinput.files[0];
    let reader = new FileReader();

  if (file !== undefined){
    if (file.size < 1048576)  {
      reader.addEventListener("load", (event) => {
        document.getElementById("r-image").src = event.target.result;
      });
      reader.readAsDataURL(file);
      document.getElementById("r-image").style.display = "block";
    } else {
      document.getElementById("r-image").src = '';
      document.getElementById("r-image").style.display = "none";
      alert('The file is too large. Maximum size is 1MB, please try again with a smaller file.');
    }

  } else {
    alert('No image detected...');
    document.getElementById("r-image").src = '';
    document.getElementById("r-image").style.display = "none";

  }
  console.log(file);
}


  const home = () => {
    navigate("/");
  };

  function selectFile() {
    document.getElementById("fileinput").click();
  }




  let i = 0;
  function appendInd() {

    let qua = document.getElementById("ind").value;
    let name = document.getElementById("ind-n").value;

    if((qua !== '') && (name !== '')){

    let input = document.createElement("input");
    let input2 = document.createElement("input");
    let button = document.createElement("button");
    let container = document.createElement("div");



    console.log(qua);
    i+=1;

    container.classList.add('flexwrapper');
    input.classList.add('shortinput');
    input2.classList.add('longinput');
    input.value = qua;
    input2.value = name;
    button.innerText = '–';

    button.classList.add('styled');

    container.appendChild(input);
    container.appendChild(input2);
    container.appendChild(button);
    container.id = 'fw'+i;

    button.addEventListener("click", function(){
      let element = document.getElementById('fw'+i);
      element.parentNode.removeChild(element.parentNode.firstChild);
      element.parentNode.removeChild(element.parentNode.firstChild);
    })


    let wrapper = document.getElementById("container");


    wrapper.appendChild(document.createElement("br"));
    wrapper.appendChild(container);

    console.log(i);
  }
  }







  return (
    <>
      <nav
        style={{
          maxWidth: "100%",
          backgroundColor: "black",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          position:'relative',
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" onClick={home}>
          Home
        </Button>
        <Logout />
      </nav>

      <Center>
        <h1 style={{padding:'10px'}}>Add a recipe</h1>
        <sub style={{padding:'10px', textAlign:'center'}}>Save a recipe to the database to share it with other users.</sub>
        <br />
        <br />

        <form onSubmit={handleSubmit} style={{padding:'10px'}}>
          <label style={{ marginRight: "15px" }} required={true} htmlFor="name">
            Name:
          </label>
          <Input
            style={{ minWidth: "80%" }}
            type="text"
            autoComplete="true"
            placeholder="Recipe's name"
            id="name"
          />
          <br />
          <br />

          <label style={{ marginRight: "25px" }} htmlFor="fileinput">
            Image:
          </label>
          <Button variant="contained" onClick={selectFile}>Select file from device...</Button>
          <input
            style={{display:'none'}}
            type="file"
            required={true}
            autoComplete="true"
            placeholder="recipe's image"
            id="fileinput"
            accept="image/png, image/jpg"
            onChange={loadImg}
          />
          <br />

          <img
            style={{
              backgroundColor: "black",
              padding: "10px",
              borderRadius: "5px",
              maxWidth: "300px",
              display: "none",
              marginTop:"15px"
            }}
            src={""}
            alt="recipe img"
            id="r-image"
          />
          <br />
          <br />
          <div className="flexwrapper">
          <div>
            <label style={{ marginRight: "15px" }} htmlFor="time">
              Cooking time:
            </label>
            <Input
              style={{ marginRight: "15px" }}
              type="time"
              required={true}
              placeholder="cooking time"
              id="time"
            />
            </div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel  id="demo-simple-select-helper-label">Level</InputLabel>
            <Select required={true} id="level" value={level} labelId="demo-simple-select-helper-label" label="Level" onChange={handleChange}>
              <MenuItem value={"Easy"}>Easy</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Hard"}>Hard</MenuItem>
            </Select>
            </FormControl>
          </div>
          <br />

          <label style={{ marginRight: "15px" }}>
            Add ingredients:
          </label>
          <br />

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", }}>
          <Input
            style={{ marginRight: "15px",maxWidth:'70px' }}
            type="text"
            placeholder="100g"
            id="ind"
          />
          <Input
            style={{ marginRight: "15px" }}
            type="text"
            placeholder="Yellow cheese"
            id="ind-n"
          />
          <Button variant="contained" onClick={appendInd}>
            +
          </Button>
          </div>
          <br />
          <label style={{ marginRight: "15px" }}>
            Ingredients:
          </label>

          <div id="container">

          </div>







          <br />

          <label style={{ marginRight: "15px",fontSize:'13px' }} htmlFor="level">
            Preparation description:
          </label>
            <br />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={9}
            required={true}
            id="description"
            placeholder="Describe how to prepare the meal..."
            style={{ marginTop:'15px',padding:'10px' }}
          />

          <div style={{ textAlign: "center", marginTop: "25px",marginBottom:'100px' }}>
            <Button variant="contained" type="submit">
              Submit recipe
            </Button>
            <Typography style={{marginTop:'20px',maxWidth:'100%',textAlign:'center'}} color={"red"}>
            {errorMessage}
          </Typography>
          </div>
        </form>
      </Center>
    </>
  );
};

export default AddRecipe;
