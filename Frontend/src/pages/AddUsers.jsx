import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin: 100px auto 0 auto;
  width: 50vw;
  border: 1px black dashed;
`;
const FlexInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const updateDB = (value) => {
  fetch("/api/users/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(value),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};

function AddUsers({ user }) {
  const [error, setError] = useState(false);
  const [authentication, setAuthentication] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const value = {
      username: data.get("UserName"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
      usercategory: data.get("radio-buttons-group"),
    };
    e.target.reset();

    if (value.userName === "" || value.password === "") {
      setError(true);
    } else {
      setError(false);
      if (value.password === value.confirmPassword) {
        delete value.confirmPassword;
        updateDB(value);
      } else {
        setAuthentication(false);
      }
    }
  };

  return (
    <Container>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 5fr 1fr" }}>
        <div>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            &#x3c;Go back
          </Button>
        </div>
        <h1>Create new user</h1>
      </div>
      <form onSubmit={handleLogin}>
        <FormControl>
          <FormLabel id="radio-buttons-group-label">User Category</FormLabel>
          <RadioGroup
            row
            aria-labelledby="radio-buttons-group-label"
            defaultValue="Table"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Table" control={<Radio />} label="Table" />
            <FormControlLabel
              value="Kitchen"
              control={<Radio />}
              label="Kitchen"
            />
            <FormControlLabel
              value="Cashier"
              control={<Radio />}
              label="Cashier"
            />
          </RadioGroup>
        </FormControl>
        <FlexInput>
          <TextField
            label="User Name"
            name="UserName"
            variant="outlined"
            margin="dense"
            autoFocus
            sx={{ width: "300px" }}
          />
          <TextField
            label="Password"
            name="password"
            variant="outlined"
            margin="dense"
            type="password"
            sx={{ width: "300px" }}
          />
          <TextField
            label="Confirm password"
            name="confirmPassword"
            variant="outlined"
            margin="dense"
            type="password"
            sx={{ width: "300px" }}
          />
        </FlexInput>
        <Button variant="contained" type="submit" sx={{ margin: "20px" }}>
          Login
        </Button>
      </form>
      {error ? (
        <p style={{ color: "red", marginTop: 0 }}>
          *Please fill in all the fields
        </p>
      ) : authentication === false ? (
        <p style={{ color: "red", marginTop: 0 }}>
          *Please key in same password
        </p>
      ) : (
        <p style={{ color: "green", marginTop: 0 }}>User added!</p>
      )}
    </Container>
  );
}

export default AddUsers;
