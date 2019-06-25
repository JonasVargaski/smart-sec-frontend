const INITIAL_STATE = {
    autenticado: false,
    token: '',
    usuario: {
        id: '',
        nome: '',
        email: '',
        endereco: '',
        telefone: '',
        dataCadastro: '',
        dataModificacao: '',
        acesso: []
    },
    controladores: [],
    controladorSelecionado: '',
    dadosControlador: {
        ultimoDado: {
            data: '',
            temp: 0,
            tempAjst: 0,
            umid: 0,
            umidAjst: 0,
            ventoinha: 0,
            alarme: 0,
            modo_trabalho: 0,
            trava: 0,
            fase: 0,
            clima: 0,
            tipoSensor: 0,
            numeroSerie: 0,
            Senha: 0,
            versaoSoftware: '',
            energia: 0
        },
        dadosGrafico: {
            umidade: {
                label1: 'Umidade',
                color1: '#1965FF', 
                label2: 'Ajuste',
                color2: '#38D0FF',
                values: [{
                    data: '',
                    Umidade: 0,
                    Ajuste: 0
                }]
            },
            temperatura: {
                label1: 'Temperatura',
                color1: '#F91818',
                label2: 'Ajuste',
                color2: '#FFDA7F',
                values: [{
                    data: '',
                    Temperatura: 0,
                    Ajuste: 0
                }]
            }
        }
    }
}

export default function state(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USUARIO':
            let { usuario } = action
            state.token = usuario.token
            state.autenticado = true
            delete usuario.token
            state.usuario = usuario;
            break;
        case 'SET_CONTROLADORES':
            const controladores = action.controladores
            state.controladores = controladores
            if(controladores.length === 1){
                state.controladorSelecionado = controladores[0].numeroSerie
            }
            break;
        case 'SET_CONTROLADOR':
            const { numeroSerie } = action
            state.controladorSelecionado = numeroSerie
            break;
        case 'SET_ULTIMO_DADO':
            const { Controlador } = action
            state.dadosControlador.ultimoDado = Controlador;
            break;
        case 'SET_DADOS_GRAFICO':
            const { Dados } = action
            state.dadosControlador.dadosGrafico.umidade.values = Dados.umid;
            state.dadosControlador.dadosGrafico.temperatura.values = Dados.temp;
            break;
        case 'LOGOUT':
            state = INITIAL_STATE;
            localStorage.removeItem('token');
            break;
        default: break;
    }
    return { ...state }
}