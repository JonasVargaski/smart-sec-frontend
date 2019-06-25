
export function setUsuario(usuario) {
    return {
        type: 'SET_USUARIO',
        usuario
    };
}

export function setControladores(controladores) {
    return {
        type: 'SET_CONTROLADORES',
        controladores
    };
}

export function setControlador(numeroSerie) {
    return {
        type: 'SET_CONTROLADOR',
        numeroSerie
    };
}

export function setUltimoDado(Controlador) {
    return {
        type: 'SET_ULTIMO_DADO',
        Controlador
    };
}

export function setDadosGrafico(Dados) {
    return {
        type: 'SET_DADOS_GRAFICO',
        Dados
    };
}

export function logout() {
    return {
        type: 'LOGOUT',
    };
}