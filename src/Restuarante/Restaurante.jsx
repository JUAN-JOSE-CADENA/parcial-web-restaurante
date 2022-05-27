import React, { useEffect } from "react";
import { connect } from "react-redux";
import imagen from "../Images/rest.jpg";
import Styles from "./Restaurante.module.scss";
import {getRestauranteAction} from "../reduxDucks/cityDuck"
import { useParams } from "react-router-dom";

function Restaurante({restaurant,getRestauranteAction}) {
  const { id } = useParams();
  useEffect(() =>{
    getRestauranteAction(id)
  },[getRestauranteAction, id])

  const URL = process.env.PUBLIC_URL + "images/";

  return (
    <div className={Styles.restaurante}>
      <img src={imagen} alt="" />
      <div className={Styles.info}>
        <h1>Nombre Restaurante</h1>
        <h2>Direccion restaurante</h2>
        <div>
          Reseña:
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et at dicta
            optio tenetur eum aperiam voluptate fugiat, delectus beatae fugit
            harum nam voluptatem aliquid quam est atque quia veniam obcaecati.
          </p>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return{
    restaurant: state.cities.restaurant
  }
}

export default connect(mapState, {getRestauranteAction})(Restaurante);
