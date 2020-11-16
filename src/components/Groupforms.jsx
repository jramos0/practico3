import React, {useState,useEffect} from 'react'
import { db } from "../firebase";



const Groupforms = (props) => {
    const initialStateValues = {
        name:'',
        apellido:'',
        horas:'',
        isss:'0.0525',
        AFP: '0.0688',
        Renta: '0.1',
        salarion:'',
        salariototal:''
    } 

    const getEmpleadoById = async (id) => {
      const doc = await db.collection('empleados').doc(id).get();
      setvalues({...doc.data()})
    }

    useEffect(() =>{
      if (props.currentId == ''){
        setvalues({...initialStateValues});
      } else{
        getEmpleadoById(props.currentId);
      }
    },[props.currentId]);

    const [values, setvalues] = useState(initialStateValues);
    console.log(values);
    const handleSubmit = e => {
        e.preventDefault();

        props.addOrEditName(values);
        setvalues({...initialStateValues})
    }

    const handleInputChange = e => {
        const {name,value} = e.target;
       setvalues({...values,[name]:value})
    ;}



    return(    

        <form  className="card card-body border-primary" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <p>Nombre</p>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese nombre"
          name="name" onChange={handleInputChange} value={values.name}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <p>Apellido</p>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese Apellido"
          name="apellido" onChange={handleInputChange} value={values.apellido}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <p>Horas</p>
        </div>
        <input
          type="number"
          className="form-control"
          placeholder="Ingrese Horas trabajadas"
          name="horas" onChange={handleInputChange} value={values.horas} 
        />
      </div>
      <button id="boton" className="btn btn-primary btn-block">
        {props.currentId == '' ? 'Guardar':'Actualizar'}
      </button>
      
      </form>
      
    );

};
export default Groupforms;