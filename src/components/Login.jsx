// import axios from "axios";
import {Navigate, useNavigate} from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate( )

    const submitHandler = (e) =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        
        if(email === '' || password === ''){

            console.log('Los campos no pueden estar vacíos')
            return;
        }
        //TAMBIÉN VAMOS A COMENAR ESTA LINEA PARA NO RENEGAR CON LOS WARNING DE LA EXPRESION REGULAR
        /*if(email !== '' && !regexEmail.test(email)){
            console.log('Debes escribir una dirección de correo valida')
            return;
        }*/
        if(email !== 'challenge@lkemy.org' || password !== 'react'){
            console.log('Credenciales inválidas')
            return;
        }

        console.log('Estamos listos para enviar la info')
        //COMENTAMOS LA PETICIÓN PORQUE NOS ESTAMOS VALIDADOS Y NO PASA.
        // axios.post('http://challenge-react.alkemy.org',{ email, password})
        //     .then(res => {
        //         //En este caso no me va a funcionar el endpoint por ende no puedo extraer la data que traer el Token
        //         swal(
        //             <h2>Perfecto ingresaste correctamente</h2>
        //         );
        //         console.log(res.data);
        //         const tokenRecibido = res.data.token;
        //         sessionStorage.setItem('token',tokenRecibido);
        //     })
        //     .catch(err => console.log(err));

        //SIMULAMOS LA PETICIÓN
        const tokenRecibido = new Date().getTime();
        console.log(tokenRecibido);
        sessionStorage.setItem('tokenAlkemy',tokenRecibido.toString());
        navigate('/listado',{
            replace:true
        })
    }

    let token = sessionStorage.getItem('tokenAlkemy');

    return (
    <>
        {token && <Navigate to="/listado"/>}

        <div className="row">
            <div className="col-6 offset-3">
                <h2>Formulario de login</h2>
                <form onSubmit={submitHandler}>
                    <label className="form-label d-block mt-2">
                        <span>Correo electrónico</span><br />
                        <input className="form-control" type="email" name="email" />
                    </label>
                    <label className="form-label d-block mt-2">
                        <span>Contraseña</span><br />
                        <input className="form-control" type="password" name="password" />   
                    </label>
                    <br />
                    <button className="btn btn-success mt-2" type="submit">Ingresar</button>
                </form>

            </div>
        </div>
        <hr />
    </>
  )
}
