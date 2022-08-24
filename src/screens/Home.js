import React from "react";
import { useEffect } from "react";
import Logout from "../components/auth/Logout";
import {
  Button,
  Input,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";

const Home = (props) => {

  let [timers, setTimers] = React.useState([]);

  useEffect(() => {
    const db = getDatabase();
    const recipesRef = ref(db, 'Recipes/');
    onValue(recipesRef, (snapshot) => {

      const data = snapshot.val();
      //console.log(data);

      const objects = Object.entries(data);

      //console.log(objects)
      let datas = document.getElementById('datas');

      for(let i = 0;i<objects.length;i++){

      let container = document.createElement("div");
      let rimg = document.createElement("div");
      let wrapper = document.createElement("div");
      let desc = document.createElement("div");

      let rname = document.createElement("span");
      let rtime = document.createElement("span");

      let how = document.createElement("p");
      let make = document.createElement("p");

      let ings = document.createElement("p");
      let list = document.createElement("ul");

      let button = document.createElement("button");


      container.classList.add('recipe',objects[i][1].name.replace(/ /g,'-').toLowerCase(),objects[i][1].time.replace(/\\/g,'0'),objects[i][1].level.toLowerCase());

      rimg.addEventListener('click',function() {
        this.parentNode.childNodes[1].classList.add('visible');
      })


      rimg.classList.add('rimage');
      wrapper.classList.add('flexwrapper');
      desc.classList.add('desc');
      button.classList.add('styled');
      rname.classList.add('styled');
      rtime.classList.add('styled');

      rname.innerHTML = '&bull;&nbsp;'+objects[i][1].name;
      rtime.innerHTML = objects[i][1].level + ' |&nbsp;<b class="rtime">'+objects[i][1].time+'</b>&nbsp;🕓';

      how.innerHTML = '<b>How to make:</b>';
      make.innerText = objects[i][1].description;
      ings.innerHTML = '<b>Ingredients:</b>';


      let ao = objects[i][1].ingredients.replace('{','')
      .replace('}','').replace(/"/g,'').replace(/:/g,' - ').split(',');

        for(let i = 0;i<ao.length;i++){
          let li = document.createElement("li");
          li.innerText = ao[i];
          list.appendChild(li);
        }

      button.innerText = '–';

      button.addEventListener('click',function() {
        this.parentNode.classList.remove('visible');
      })

      rimg.style.backgroundImage = 'url('+ objects[i][1].image +')';



      wrapper.appendChild(rname);
      wrapper.appendChild(rtime);
      rimg.appendChild(wrapper);

      desc.appendChild(ings);
      desc.appendChild(list);

      desc.appendChild(how);
      desc.appendChild(make);
      desc.appendChild(button);

      container.appendChild(rimg);
      container.appendChild(desc);

      datas.appendChild(container);

      setTimers((timers) => [...timers, objects[i][1].time]);


      }


    })



  }, []); // eslint-disable-line react-hooks/exhaustive-deps



  const [level, setLevel] = React.useState("");
  const [time, setTime] = React.useState("");



  const handleLevelChange = (event) => {
    setLevel(event.target.value);
    document.getElementById("level").value = event.target.value;

    let x = document.getElementById("level").value.toLowerCase();
    //console.log(x);
    let list = document.getElementsByClassName('recipe');

    for (let i=0;i<list.length;i++){

      if (list[i].classList.contains(x)===false){
        list[i].classList.add('hidden');
      } else {
        list[i].classList.replace('hidden','visible');
      }
    }

  };

  function resetFilter() {
    let list = document.getElementsByClassName('recipe');

    for (let i=0;i<list.length;i++){
        list[i].classList.replace('hidden','visible');
      }
    }


  const handleTimeChange = (event) => {
    setTime(event.target.value);
    document.getElementById("time").value = event.target.value;
    console.log(document.getElementById("time").value);

    let x = document.getElementById("time").value;
    //console.log(x);
    let list = document.getElementsByClassName('recipe');

    for (let i=0;i<list.length;i++){

      if (list[i].classList.contains(x)===false){
        list[i].classList.add('hidden');
      } else {
        list[i].classList.replace('hidden','visible');
      }
    }
  };


  const handleSearch = (event) => {
    console.log(event.target.value);
    let x = event.target.value.toLowerCase().replace(/ /g,'-');
    let list = document.getElementsByClassName('recipe');

    if (x.length > 2){
      console.log('start search...')

    for (let i=0;i<list.length;i++){


      let clist = list[i].classList.value.replace(/ /g,'-');
        //console.log(clist.match(x) !== null);
      if (clist.match(x) == null){
        list[i].classList.add('hidden');
      } else {
        list[i].classList.replace('hidden','visible');
      }

    }

    } else {
      resetFilter();
    }


  };







  const navigate = useNavigate();
  const add = () => {
    navigate("/add-recipe");
  };


  return (
    <>
      <nav
        style={{
          maxWidth: "100%",
          backgroundColor: "black",
          padding: "20px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" onClick={add}>
          Add recipe
        </Button>
        <Logout />
      </nav>

      <div
        id="ui"
        style={{
          backgroundColor: "white",
          width: "80%",
          padding: "0% 10%",
          textAlign: "center",
          marginTop:'30px'
        }}
      >
        <h1>Welcome to culinary recipes!</h1>
        <sub>Your daily dose of cooking inspiration.</sub>
        <br />
        <br />
        <label style={{ marginRight: "15px" }} htmlFor="name">
          Search recipes:
        </label>
        <br />
        <br />
        <Input
          style={{ minWidth: "80%", textAlign: "center" }}
          type="text"
          autoComplete="true"
          placeholder="Recipe's name"
          id="search"
          onChange={handleSearch}
        />
        <br />
        <br />
        <label style={{ marginRight: "15px" }} htmlFor="name">
          Filter by:
        </label>
        <div
          className="flexwrapper"
          style={{ paddingLeft: "7%", paddingRight: "7%", width: "86%" }}
        >
        <div className="flexwrapper-no-width">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="level">Level</InputLabel>
            <Select
              id="level"
              value={level}
              labelId="level"
              label="Level"
              onChange={handleLevelChange}
            >
              <MenuItem value={"Easy"}>Easy</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"Hard"}>Hard</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={resetFilter} color="error">x</Button>
          </div>
          <div className="flexwrapper-no-width">
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="time">Time</InputLabel>
            <Select
              id="time"
              value={time}
              labelId="time"
              label="Time"
              onChange={handleTimeChange}
            >
            {timers.map((time) => (
            <MenuItem
              value={time}
              key={time}> {time} </MenuItem>
            ))}
            </Select>
          </FormControl>
            <Button onClick={resetFilter}  color="error">x</Button>
          </div>
        </div>
      </div>

      <br />


      <div
        id="datas"
        className="flexwrapper-x"
        style={{
          width: "80%",
          padding: "0% 10% 5% 8%",
          marginBottom:'50px'
        }}
      >

      </div>









    </>
  );
};

export default Home;
