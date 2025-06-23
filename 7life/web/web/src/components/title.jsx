import "./title.css"


const Title = ({user}) =>{
return(
    <section className="titular-title">
        <h1 className="nome-title">     {user.usu_nome}    </h1>
        <h2 className="idad-title reset"> {user.usu_nascimento}</h2>
    </section>
    


)

}

export default Title;