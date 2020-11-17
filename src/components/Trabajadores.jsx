import React, {useEffect, useState} from 'react'
import Groupforms from "./Groupforms"
import {db} from '../firebase'
import {toast} from 'react-toastify'

const Trabajadores = () => {

    const[trabajadores, setTrabajadores] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditName = async (nombreobject) => {
        if (currentId == ''){
        await db.collection('empleados').doc().set(nombreobject);
        toast('Nueva adicion',{
            type:'success',
            autoClose: 2000,
        })
        }else{
          await db.collection('empleados').doc(currentId).update(nombreobject);
          toast('Actualizacion correcta',{
            type:'info',
            autoClose: 2000,
        });
        setCurrentId('');
        }
        

    };

    const onDeletetrab = async (id) =>{
        if (window.confirm("Confirma que quieres eliminar?")) {
          await db.collection('empleados').doc(id).delete();
          toast('Eliminacion Completa',{
            type:'error',
            autoClose: 2000,
        })  
        }        
    }

    const gettrabajadores = async () => {
        db.collection("empleados").onSnapshot((querySnapshot) => {
        const docs = [];
            querySnapshot.forEach(doc => {
            docs.push({...doc.data(), id:doc.id});
        });
        setTrabajadores(docs);
    });
};

    useEffect(() => {
        gettrabajadores();
    }, [])


    return<div>
        <Groupforms {...{addOrEditName,currentId,trabajadores}}/>
        <div className="col-md-12 p-2">
            
            {trabajadores.map(trabajadores => (
                <div className="card mb-1" key={trabajadores.id}> 
                    <div className="card-body">
                   <div className="d-flex justify-content-between"> 
                <h2>{trabajadores.codempleado}</h2> 
                <div>
                    <button className="btn btn-warning" onClick={() => setCurrentId(trabajadores.id)}>Editar</button>
                <button className="btn btn-danger" onClick={() => onDeletetrab(trabajadores.id)}>X</button>
                </div> 
                
            </div>
            <hr></hr>
            <div className="d-flex justify-content-between"> 
                <div>
                <p>Nombre: {trabajadores.name}</p>
                <p>Apellido: {trabajadores.apellido}</p> 
                <p>Horas Trabajadas: {trabajadores.horas}</p>
                <p>Salario a Recibir: {trabajadores.salariototal}</p>
                </div>  
                <div>
                <p>Descuento ISSS: {trabajadores.descisss}</p>
                <p>Descuento AFP: {trabajadores.desafp}</p>
                <p>Descuento RENTA: {trabajadores.descrenta}</p>
                <p>Descuento TOTAL: {trabajadores.desctotal}</p>
                </div> 
                
            </div>
                
                
                 </div>
                </div>
            ))}
        </div>
    </div>
};

export default Trabajadores;