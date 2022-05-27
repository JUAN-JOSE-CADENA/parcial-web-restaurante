import { Card, Input, Row, Text } from "@nextui-org/react";
import React, { useState } from "react";
import Styles from "./Buscador.module.scss";
import fondo from "../Images/fondo.jpg";
import { getCityAction } from "../reduxDucks/cityDuck";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Buscador({ getCityAction, restaurants }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getCityAction(search);
    console.log(restaurants);
    // console.log(search)
  };

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const URL2 = process.env.PUBLIC_URL + "images/";

  return (
    <div className={Styles.buscador}>
      <img src={fondo} alt="" />
      <h1>Encuentra tu restaurante más cercano</h1>
      <form onSubmit={handleSubmit}>
        <Input
          aria-label="label"
          minLength={3}
          onChange={handleChange}
          required
          width="25rem"
          type="search"
          placeholder="Busca tu ciudad"
        />
      </form>
      {restaurants ? (
        <div className={Styles.finds}>
          {restaurants.map((res) => (
            <Link to={`/search/${res.id}`} key={res.id}>
              <Card hoverable clickable>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                  className={Styles.cardimg}
                    objectFit="cover"
                    src={URL2 + res.img}
                    width="100%"
                    height={140}
                    alt="{item.title}"
                  />
                </Card.Body>
                <Card.Footer justify="flex-start">
                  <Row wrap="wrap" justify="space-between">
                    <Text b>{res.nombre}</Text>
                  </Row>
                </Card.Footer>
              </Card>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// const ar = (
//   <Card hoverable clickable>
//     <Card.Body css={{ p: 0 }}>
//       <Card.Image
//         objectFit="cover"
//         src={URL2 + item.img}
//         width="100%"
//         height={140}
//         alt="{item.title}"
//       />
//     </Card.Body>
//     <Card.Footer justify="flex-start">
//       <Row wrap="wrap" justify="space-between">
//         <Text b>10</Text>
//         <Text css={{ color: "$accents4", fontWeight: "$semibold" }}>
//           10
//         </Text>
//       </Row>
//     </Card.Footer>

//   </Card>

// <Card css={{ mw: "330px" }} key={res.nombre}>
// <Text h4 color="white">
//   {res.nombre}
// </Text>
// <Card.Footer>
//   <Link to={`/search/${res.nombre}`}>Ver Restaurante</Link>
// </Card.Footer>
// </Card>
// );

const mapState = (state) => {
  return {
    restaurants: state.cities.array,
  };
};

export default connect(mapState, { getCityAction })(Buscador);
