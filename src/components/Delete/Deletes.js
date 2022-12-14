import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from '../../redux/cars/cars';

const Deletes = () => {
  const dispatch = useDispatch();
  const carsData = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(getCars());
  }, [dispatch]);

  const deleteCar = async (e) => {
    e.preventDefault();
    const carID = document.getElementById('reservation-form__model').value;
    const response = await fetch(`https://tealsbranch.herokuapp.com//cars/${carID}`, {
      method: 'DELETE',
      headers: { Accept: '*/*', 'Content-Type': 'application/json' },
    });
    response.json();
    if (response.status === 200) {
      window.location.reload();
    }
    return response;
  };

  const formOptions = () => {
    const options = [];
    carsData.forEach((car) => {
      options.push(<option key={car.id} value={car.id}>{car.model}</option>);
    });
    return options;
  };

  return (
    <section id="reservation-form">
      <h2> DELETE FORM </h2>
      <form onSubmit={(e) => { deleteCar(e); }}>
        <select name="model" id="reservation-form__model" form="reserve-car">
          {formOptions()}
        </select>
        <button type="submit">DELETE</button>
      </form>
    </section>
  );
};

export default Deletes;
