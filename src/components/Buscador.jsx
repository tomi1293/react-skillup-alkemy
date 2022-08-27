import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Buscador = () => {

    const navigate = useNavigate();

    const submitHandler = (e) => {
        
        e.preventDefault();
        //capturamos del e el elemento que tenga el atributo name = keyword
        const keyword = e.currentTarget.keyword.value.trim();
        
        if(keyword.length === 0){
            Swal.fire('Tienes que escribir una palabra clave');
        } else if(keyword.length < 4){
            Swal.fire('Tienes que escribir al menos 4 caracteres');
        }else{
            //Antes de redirigir, limpiamos el form
            e.currentTarget.keyword.value= '';
            navigate(`/resultados?keyword=${keyword}`,{
                replace: true
            });
        }

    }

    return (
        <form className="d-flex align-items-center" onSubmit={submitHandler}>
            <label className="form-label mb-0 mx-2">
                <input className="form-control" type="text" name="keyword" placeholder="Buscar un película..." />
            </label>
            <button className="btn btn-success" type="submit">Buscar</button>
        </form>
    )
}
