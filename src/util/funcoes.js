const formatarData = data => {
    if(!data)
    return '- -'
    let date = data.toString().split('T');
    let dataFormatada = date[0].split('-')
    let horaFormatada = date[1].substring(0, 8)
    return `${dataFormatada[2]}/${dataFormatada[1]}/${dataFormatada[0]} ${horaFormatada}`

    //2019-05-04T06:38:09.000Z
}

module.exports = { formatarData }