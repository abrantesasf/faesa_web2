import './index.css';

const MeuFormulario = () => {
    return(
        <div>
            <p>Entre com seu login e senha:</p>
            <form className='formClass'>
                <label htmlFor="nome">Login*: </label>
                <input type="text" name="nome" />
                <label htmlFor="senha">Senha*: </label>
                <input type="Password" name="senha" />
                <input type="button" value="Enviar" />
            </form>
            <p>Se você não tiver login/senha, ligue para a secretaria
                de saúde e peça seu cadastro.
            </p>
        </div>
    );
}

export default MeuFormulario;
