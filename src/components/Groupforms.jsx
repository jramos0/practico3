import React, {useState,useEffect} from 'react'
import { db } from "../firebase";
import {toast} from 'react-toastify'


const Groupforms = (props) => {
    const initialStateValues = {
        codempleado:'',
        name:'',
        apellido:'',
        horas:'',
        descisss:'',
        descafp:'',
        desctotal:'',
        salarion:'',
        salariototal:''
    } 
//llama a los empleados y a sus datos por el Id
    const getEmpleadoById = async (id) => {
      const doc = await db.collection('empleados').doc(id).get();
      setvalues({...doc.data()})
    }

    //Imprime los datos en el form
    useEffect(() =>{
      if (props.currentId == ''){
        setvalues({...initialStateValues});
      } else{
        getEmpleadoById(props.currentId);
      }
    },[props.currentId]);

    const validatehoras = Number =>{

    }


    const [values, setvalues] = useState(initialStateValues);
    
    
    const handleSubmit = e => {
        e.preventDefault();
        console.log(values);


        if (values.horas <= 160) {
          values.salarion = values.horas*9.75;
          values.descisss=values.horas*0.0525;
          values.descafp=values.horas*0.0688;
          values.descrenta=values.horas*0.1;
          values.desctotal = values.descisss + values.descafp + values.descrenta;
          values.salariototal=values.salarion-values.desctotal;
          console.log(values.salariototal);          
        } else if (values.horas <= 200) {
          values.salarion= (160*9.75)+((values.horas-160)*11.50);
          values.descisss=values.horas*0.0525;
          values.descafp=values.horas*0.0688;
          values.descrenta=values.horas*0.1;
          values.desctotal = values.descisss + values.descafp + values.descrenta;
          values.salariototal=values.salarion-values.desctotal;
          console.log(values.salariototal);          
        } else if (values.horas <= 250) {
          values.salarion= (160*9.75)+(40*11.50)+((values.horas-200)*12.50);
          values.descisss=values.horas*0.0525;
          values.descafp=values.horas*0.0688;
          values.descrenta=values.horas*0.1;
          values.desctotal = values.descisss + values.descafp + values.descrenta;
          values.salariototal=values.salarion-values.desctotal;
          console.log(values.salariototal);          
        } else if ( values.horas>250 || values.horas<=1){
          return (
            toast('Debe ser horas enteras positivas y no mayores a 250 ',{
            type:'error',
            autoClose: 2000,
        })  
          )
          
        }
          
         

        
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
          <p>Cod  </p>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese nombre"
          name="codempleado" onChange={handleInputChange} value={values.codempleado}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <p>Nombre  </p>
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
          <p>Horas  </p>
        </div>
        <input
          type="number"
          className="form-control"
          placeholder="Ingrese Horas trabajadas"
          name="horas" min="1" max="250" pattern="^[0-9]+" onChange={handleInputChange} value={values.horas} 
        />
      </div>
      <button id="boton" className="btn btn-primary btn-block">
        {props.currentId == '' ? 'Guardar':'Actualizar'}
      </button>
      
      </form>
      
    );

};
export default Groupforms;